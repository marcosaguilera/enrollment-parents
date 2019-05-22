import React, { Component } from 'react';

//// Other dependencies
import axios from 'axios';
import NumberFormat from 'react-number-format';

//// Components
import Demographic from '../Demographic/Demographic'

//// Functions
import Utils from '../../../../Utils/Utils.js'
import Texts from '../../../../Utils/Texts'

//// Addons
//import LoadingModal from '../../Addons/LoadSpinner';
//import ModalUI from '../../Addons/Modal';
//import ModalUI2 from '../../Addons/Modal';

//////// Assets
import '../../Modules/ServicesMontly/ServicesMontly.css';

class ServicesMontly extends Component {
    constructor() {
        super();
        this.handleOnChange          = this.handleOnChange.bind(this)
        this.setTotals               = this.setTotals.bind(this)
        this.setMontlyTotal          = this.setMontlyTotal.bind(this)
        this.onStarClick             = this.onStarClick.bind(this)
        this.addDonationSelection    = this.addDonationSelection.bind(this)
        this.removeDonationSelection = this.removeDonationSelection.bind(this)

        this.state = {
            // General Data                     // Demographic data
            step2_data              : {},       code     : '',
            demo_data               : [],       name     : '',
            lodgings                : 0,        lastname : '',
            transport               : 0,        grade    : '',
            lunch                   : 0,        donSolid : false,
            snack                   : 0,        donEdu   : false,
            breakFast               : 0,        donPres  : false,
            lifeSecure              : 0,
            jobSecure               : 0,
            donation                : 30000,

            //Discounts                         // Selection values
            discountLodgings        : 0,        transportSel  : 'Si',
            discountTransport       : 0,        lunchSel      : 'Si',
            discountLunch           : 0,        snackSel      : 'Si',
            discountSnack           : 0,        breakFastSel  : 'Si',
            discountBreakfast       : 0,        lifeSecureSel : 'Si',
            discountLifeSecure      : 0,        jobSecureSel  : 'Si',
            discountJobSecure       : 0,        donationSel   : [],

            //Total
            totalLodgings           : 0,        // Extra states
            totalTransport          : 0,        matriculaCode : '',
            totalLunch              : 0,        pensionName   : '',
            totalSnack              : 0,        donacionName  : '',
            totalBreakfast          : 0,        transportName : '',
            totalLifeSecure         : 0,        asopadresSelection: '',
            totalJobSecure          : 0,
            totalDonation           : 0,
            totalMontlyServices     : 0
        };
    }

    componentDidMount = () => {
        let servicesObj = this.props.location.state

        this.setState({
                        step2_data         : servicesObj,
                        code               : servicesObj.demographic.codigo,
                        name               : servicesObj.demographic.nombres,
                        lastname           : servicesObj.demographic.apellidos,
                        grade              : servicesObj.demographic.grado,
                        matriculaCode      : servicesObj.annual_services[0].code,
                        donacionName       : Utils.getDonacionName(this.state.donation),
                        asopadresSelection : servicesObj.annual_services[4].select
                    }, () => {
                        this.setState({ pensionName : Utils.getPensionName(this.state.matriculaCode) })
                    })

        let url = "https://rcis-backend.herokuapp.com/student/monthlyservices/" + servicesObj.demographic.codigo
        axios.get(url)
        .then(res => {
            let montly_data = res.data[0]
            this.setState({
                lodgings            : Utils.checkNull(montly_data.pension),
                transport           : Utils.checkNull(montly_data.transporte),
                lunch               : Utils.checkNull(montly_data.alimentos_almuerzo),
                snack               : Utils.checkNull(montly_data.alimentos_m9),
                breakFast           : Utils.checkNull(montly_data.alimentos_desayuno),
                lifeSecure          : Utils.checkNull(montly_data.seguro_vida),
                jobSecure           : this.state.asopadresSelection === "Si" ? 59500 : 64300,

                //discounts
                discountLodgings    : Utils.checkNull(montly_data.pension_descuento),
                discountTransport   : Utils.checkNull(montly_data.transporte_descuento),
                discountLunch       : Utils.checkNull(montly_data.alimentos_almuerzo_descuento),
                discountSnack       : Utils.checkNull(montly_data.alimentos_m9_descuento),
                discountBreakfast   : Utils.checkNull(montly_data.alimentos_desayuno_descuento),
                discountLifeSecure  : Utils.checkNull(montly_data.seguro_vida_descuento),
                discountJobSecure   : Utils.checkNull(montly_data.seguro_desempleo_descuento),
            }, () => {
                this.setTotals()
                this.setState({ transportName : Utils.getTransportServiceName(this.state.transport) }, ()=>{
                    //console.log(this.state.transportName +  "--- valor seguro desempleo" + this.state.jobSecure)
                })
            })
        })
    };

    setTotals = () => {
        /*console.log("-> Pensión: " + this.state.lodgings  )
        console.log("-> Transporte: " + this.state.transport)
        console.log("-> Almuerzo: " + this.state.lunch     )
        console.log("-> M9: " + this.state.snack     )
        console.log("-> Desayuno: " + this.state.breakFast )
        console.log("-> Seguro de vida: " + this.state.lifeSecure)
        console.log("-> Seguro empleo: " + this.state.jobSecure )*/
        this.setState({
            totalLodgings           : Number(this.state.lodgings - this.state.discountLodgings),
            totalTransport          : Number(this.state.transport - this.state.discountTransport),
            totalLunch              : Number(this.state.lunch - this.state.discountLunch < 0 ? 0 : this.state.discountLunch),
            totalSnack              : Number(this.state.snack - this.state.discountSnack < 0 ? 0 : this.state.discountSnack),
            //totalBreakfast          : Number(this.state.breakFast - this.state.discountBreakfast),
            totalLifeSecure         : Number(this.state.lifeSecure - this.state.discountLifeSecure < 0 ? 0 : this.state.discountLifeSecure),
            totalJobSecure          : Number(this.state.jobSecure - this.state.discountJobSecure < 0 ? 0 : this.state.discountJobSecure),
            totalDonation           : Number(this.state.donation)
        },  () => {  this.setMontlyTotal()  })
    }

    setMontlyTotal = () =>{
        this.setState({
            totalMontlyServices :   this.state.totalLodgings +
                                    this.state.totalTransport +
                                    this.state.totalLunch +
                                    this.state.totalSnack +
                                    this.state.totalBreakfast +
                                    this.state.totalLifeSecure +
                                    this.state.totalJobSecure +
                                    this.state.totalDonation
        })
    }

    handleOnChange(e){
        if(e.target.id === 'transportSelector'){
            this.setState({ transport: Number(e.target.value) }, () => {
                this.setTotals()
                this.setState({ transportName : Utils.getTransportServiceName(this.state.transport) })
            })
        }

        if(e.target.id === 'donacionSelector'){
            this.setState({ donation: Number(e.target.value) }, () => {
                this.setTotals()
                this.setState({ donacionName : Utils.getDonacionName(this.state.donation) })
            })
        }

        if(e.target.id === 'donationDefaultCheck1'){
            let donSolidValue = e.target.value
            this.setState({
                donSolid: !this.state.donSolid
            }, () => { 
                if(this.state.donSolid){
                    this.addDonationSelection(donSolidValue)
                }else{
                    this.removeDonationSelection(donSolidValue)
                }
            })
        }

        if(e.target.id === 'donationDefaultCheck2'){
            let donEduValue = e.target.value
            this.setState({
                donEdu: !this.state.donEdu
            }, () => { 
                if(this.state.donEdu){
                    this.addDonationSelection(donEduValue)
                }else{
                    this.removeDonationSelection(donEduValue)
                }
            })
        }

        if(e.target.id === 'donationDefaultCheck3'){
            let donPreValue = e.target.value
            this.setState({
                donPres: !this.state.donPres
            }, () => { 
                if(this.state.donPres){
                    this.addDonationSelection(donPreValue)
                }else{
                    this.removeDonationSelection(donPreValue)
                }
            })
        }

        //Lunch onChange Actions
        if(e.target.id === 'lunch_yes'){
            this.setState({ lunch: Number(e.target.value), lunchSel : 'Si' }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'lunch_no'){
            this.setState({ lunch: 0, lunchSel : 'No' }, () => {
                this.setTotals()
            })
        }

        //Snack onChange Actions
        if(e.target.id === 'snack_yes'){
            this.setState({ snack: Number(e.target.value), snackSel : 'Si' }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'snack_no'){
            this.setState({ snack: 0, snackSel : 'No' }, () => {
                this.setTotals()
            })
        }

        //Breakfast onChange Actions
        if(e.target.id === 'breakFast_yes'){
            this.setState({ breakFast: Number(e.target.value), breakFastSel : 'Si' }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'breakFast_no'){
            this.setState({ breakFast: 0, breakFastSel : 'No' }, () => {
                this.setTotals()
            })
        }

        //LifeSecure onChange Actions
        if(e.target.id === 'lifeSecure_yes'){
            this.setState({ lifeSecure: Number(e.target.value), lifeSecureSel : 'Si' }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'lifeSecure_no'){
            this.setState({ lifeSecure: 0, lifeSecureSel : 'No' }, () => {
                this.setTotals()
            })
        }

        //jobSecure onChange Actions
        if(e.target.id === 'jobSecure_yes'){
            this.setState({ jobSecure: Number(e.target.value), jobSecureSel : 'Si' }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'jobSecure_no'){
            this.setState({ jobSecure: 0, jobSecureSel : 'No' }, () => {
                this.setTotals()
            })
        }
    }

    addDonationSelection = (data) =>{
        console.log("add")
        let selArr = this.state.donationSel
        selArr.push(data)
        console.log(selArr)
    }

    removeDonationSelection = (data) =>{
        console.log("remove")
        let selArr = this.state.donationSel
        let pos = selArr.indexOf(data);
        selArr.splice(pos, 1)
        console.log(selArr)
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({donationSel: nextValue});
    }

    nextPath = () => {
        let data_step2      = this.state.step2_data
        let montly_services = []
        let lodgings        = {}
        let transport       = {}
        let lunch           = {}
        let snack           = {}
        let breakFast       = {}
        let lifeSecure      = {}
        let jobSecure       = {}
        let donations       = {}
        let totals_montly   = {}

        //////SERIALIZNG SELECTIONS///////
        /// PENSIÓN
        lodgings.type        = 'Mensual'
        lodgings.name        = this.state.pensionName
        lodgings.code        = Utils.getServiceCode(this.state.pensionName)
        lodgings.select      = 'Si'
        lodgings.value       = this.state.lodgings
        lodgings.discount    = this.state.discountLodgings
        lodgings.total       = this.state.totalLodgings
        /// TRANSPORTE
        transport.type       = 'Mensual'
        transport.name       = "Transporte"
        transport.code       = Utils.getServiceCode(this.state.transportName)
        transport.select     = this.state.transportName
        transport.value      = this.state.transport
        transport.discount   = this.state.discountTransport
        transport.total      = this.state.totalTransport
        /// ALMUERZO
        lunch.type           = 'Mensual'
        lunch.name           = 'Almuerzo'
        lunch.code           = Utils.getServiceCode('Almuerzo')
        lunch.select         = this.state.lunchSel
        lunch.value          = this.state.lunch
        lunch.discount       = this.state.discountLunch
        lunch.total          = this.state.totalLunch
        /// M9
        snack.type           = 'Mensual'
        snack.name           = 'Medias Nueves'
        snack.code           = Utils.getServiceCode('Medias Nueves')
        snack.select         = this.state.snackSel
        snack.value          = this.state.snack
        snack.discount       = this.state.discountSnack
        snack.total          = this.state.totalSnack
        /// DESAYUNO
        //breakFast.type       = 'Mensual'
        //breakFast.name       = 'Desayuno'
        //breakFast.code       = Utils.getServiceCode('Desayuno')
        //breakFast.select     = this.state.breakFastSel
        //breakFast.value      = this.state.breakFast
        //breakFast.discount   = this.state.discountBreakfast
        //breakFast.total      = this.state.totalBreakfast
        /// SEGURO VIDA
        lifeSecure.type      = 'Mensual'
        lifeSecure.name      = 'Seguro de vida'
        lifeSecure.code      = Utils.getServiceCode('Seguro de vida')
        lifeSecure.select    = this.state.lifeSecureSel
        lifeSecure.value     = this.state.lifeSecure
        lifeSecure.discount  = this.state.discountLifeSecure
        lifeSecure.total     = this.state.totalLifeSecure
        /// SEGURO DESEMPLEO
        jobSecure.type       = 'Mensual'
        jobSecure.name       = 'Seguro desempleo'
        jobSecure.code       = Utils.getServiceCode('Seguro desempleo')
        jobSecure.select     = this.state.jobSecureSel
        jobSecure.value      = this.state.jobSecure
        jobSecure.discount   = this.state.discountJobSecure
        jobSecure.total      = this.state.totalJobSecure
        /// DONACIÓN
        donations.type       = 'Mensual'
        donations.name       = 'Donación ' + this.state.donacionName
        donations.code       = Utils.getServiceCode(this.state.donacionName)
        donations.select     = JSON.stringify(this.state.donationSel)
        donations.value      = this.state.donation
        donations.discount   = 0
        donations.total      = this.state.donation

        montly_services.push(lodgings)
        montly_services.push(transport)
        montly_services.push(lunch)
        montly_services.push(snack)
        montly_services.push(breakFast)
        montly_services.push(lifeSecure)
        montly_services.push(jobSecure)
        montly_services.push(donations)

        totals_montly.montly_total_pay = this.state.totalMontlyServices

        data_step2['montly_services'] = montly_services
        data_step2['payments'].push(totals_montly)
        console.log("Final data Step 2: ");
        console.log(data_step2)
        this.props.history.push('/enrolment_eco_services', data_step2);
    }

    render() {
        return (
        <div>
            <main role="main"  className="container" id="customStyle">
                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Demographic code={this.state.code} 
                                grade={this.state.grade} 
                                name={this.state.name} 
                                lastname={this.state.lastname} />

                    <hr/>

                    <h2 className="py-3">Selección de servicios mensuales</h2>
                    <div className="table-responsive">
                        <table id="tablePreview" className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th><center>Selección</center></th>
                                <th className="totalAlignment">Valor</th>
                                <th><center>Descuento</center></th>
                                <th className="totalAlignment">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pensión</td>
                                <td className="choiceCustomClass"></td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.lodgings} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="discountAlignment">
                                    <NumberFormat value={this.state.discountLodgings} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.totalLodgings} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>
                            <tr>
                                <td>Transporte <a href="https://rochester.edu.co/matriculas2019/#transporte" className="badge btn-link" target="_blank">(Ver más)</a></td>
                                <td className="choiceCustomClass">
                                    <select className="form-control"
                                        id="transportSelector"
                                        style={{ width: '100%', display: 'inherit' }}
                                        onChange={this.handleOnChange}
                                        value={this.state.transport}>
                                            <option value="433000">Completo Cercano</option>
                                            <option value="489000">Completo Intermedio</option>
                                            <option value="567000">Completo Lejano</option>
                                            <option value="274000">Medio Cercano</option>
                                            <option value="292000">Medio Intermedio</option>
                                            <option value="351000">Medio Lejano</option>
                                            <option value="0" >Sin servicio</option>
                                            {/* Cuando un padre seleccione un transporte seleccionará si desea tomar modalidad extracurricular */}
                                    </select>
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.transport} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="discountAlignment">
                                    <NumberFormat value={this.state.discountTransport} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.totalTransport} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>
                            <tr>
                                <td>Almuerzo <a href="https://rochester.edu.co/alimentacion" className="badge btn-link" target="_blank">(Ver más)</a></td>
                                <td className="choiceCustomClass">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="lunchRadioOptions" id="lunch_yes" value="442000" defaultChecked onChange={this.handleOnChange} /> 
                                        <label className="form-check-label" htmlFor="lunch_yes">Si</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="lunchRadioOptions" id="lunch_no" value="0" onChange={this.handleOnChange} />
                                        <label className="form-check-label" htmlFor="lunch_no">No</label>
                                    </div>
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.lunch} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="discountAlignment">
                                    <NumberFormat value={this.state.discountLunch} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.totalLunch} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>
                            <tr>
                                <td>Medias Nueves <a href="https://rochester.edu.co/alimentacion" className="badge btn-link" target="_blank">(Ver más)</a></td>
                                <td className="choiceCustomClass">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="snackRadioOptions" id="snack_yes" value="111000" defaultChecked  onChange={this.handleOnChange}/> 
                                        <label className="form-check-label" htmlFor="snack_yes">Si</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="snackRadioOptions" id="snack_no" value="0" onChange={this.handleOnChange} />
                                        <label className="form-check-label" htmlFor="snack_no">No</label>
                                    </div>
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.snack} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="discountAlignment">
                                    <NumberFormat value={this.state.discountSnack} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.totalSnack} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>
                            {/*<tr>
                                <td>Desayuno <a href="https://rochester.edu.co/alimentacion" className="badge btn-link" target="_blank">(Ver más)</a></td>
                                <td className="choiceCustomClass">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="breakFastRadioOptions" id="breakFast_yes" value="135000" defaultChecked  onChange={this.handleOnChange}/> 
                                        <label className="form-check-label" htmlFor="breakFast_yes">Si</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="breakFastRadioOptions" id="breakFast_no" value="0" onChange={this.handleOnChange} />
                                        <label className="form-check-label" htmlFor="breakFast_no">No</label>
                                    </div>
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.breakFast} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="discountAlignment">
                                    <NumberFormat value={this.state.discountBreakfast} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.totalBreakfast} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>*/}
                            <tr>
                                <td>Seguro de vida <a href="https://rochester.edu.co/matriculas2019/#seguros" className="badge btn-link" target="_blank">(Ver más)</a></td>
                                <td className="choiceCustomClass">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="lifeSecureRadioOptions" id="lifeSecure_yes" value="65000" defaultChecked  onChange={this.handleOnChange}/> 
                                        <label className="form-check-label" htmlFor="lifeSecure_yes">Si</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="lifeSecureRadioOptions" id="lifeSecure_no" value="0" onChange={this.handleOnChange} />
                                        <label className="form-check-label" htmlFor="lifeSecure_no">No</label>
                                    </div>
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.lifeSecure} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="discountAlignment">
                                    <NumberFormat value={this.state.discountLifeSecure} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.totalLifeSecure} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>
                            <tr>
                                <td>Seguro de desempleo <a href="https://rochester.edu.co/matriculas2019/#seguros" className="badge btn-link" target="_blank">(Ver más)</a></td>
                                <td className="choiceCustomClass">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="jobSecureRadioOptions" id="jobSecure_yes" value="64300" defaultChecked  onChange={this.handleOnChange}/> 
                                        <label className="form-check-label" htmlFor="jobSecure_yes">Si</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="jobSecureRadioOptions" id="jobSecure_no" value="0" onChange={this.handleOnChange} />
                                        <label className="form-check-label" htmlFor="jobSecure_no">No</label>
                                    </div>
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.jobSecure} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="discountAlignment">
                                    <NumberFormat value={this.state.discountJobSecure} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.totalJobSecure} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>
                            <tr>
                                <td>Donaciones a proyectos de sostenibilidad <p style={{ fontSize: 11 }}>{Texts.general_texts[0].donation_help}</p></td>
                                <td className="choiceCustomClass">
                                    <div className="form-check form-check form-check-inline">
                                        <input className="form-check-input" onChange={this.handleOnChange} type="checkbox" value="solidaridad" id="donationDefaultCheck1" />
                                        <label className="form-check-label" htmlFor="donationDefaultCheck1">
                                            Solidaridad
                                        </label>
                                    </div>
                                    <div className="form-check form-check form-check-inline">
                                        <input className="form-check-input" onChange={this.handleOnChange} type="checkbox" value="educacion" id="donationDefaultCheck2" />
                                        <label className="form-check-label" htmlFor="donationDefaultCheck2">
                                            Educación
                                        </label>
                                    </div>
                                    <div className="form-check form-check form-check-inline">
                                        <input className="form-check-input" onChange={this.handleOnChange} type="checkbox" value="preservacion" id="donationDefaultCheck3" />
                                        <label className="form-check-label" htmlFor="donationDefaultCheck2">
                                            Preservación
                                        </label>
                                    </div>
                                    <select className="form-control"
                                            id="donacionSelector"
                                            onChange={this.handleOnChange}
                                            value={this.state.donation}>
                                                <option value="30000">1 Corazón x ❤</option>
                                                <option value="50000">2 Corazones x ❤❤</option>
                                                <option value="200000">3 Corazones x ❤❤❤</option>
                                                <option value="300000">4 Corazones x ❤❤❤❤</option>
                                                <option value="0" >No deseo donar</option>
                                    </select>
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.donation} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="discountAlignment">
                                    <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                                <td className="totalAlignment">
                                    <NumberFormat value={this.state.donation} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>

                            <tr style={{ backgroundColor: 'rgba(0,0,0,.03)' }}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><h5 className="totalAlignment"><NumberFormat value={this.state.totalMontlyServices} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h5></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr style={{ backgroundColor: 'rgba(0,0,0,.03)' }}>
                                <td colSpan="4"></td>
                                <td>
                                    <button type="button"
                                        className="btn btn-primary btn-lg btn-block"
                                        onClick={this.nextPath}
                                        disabled={this.state.isDisableSelect}>Siguiente
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                        </table>
                    </div>
                </div>

            </main>
        </div>
        );
    }
}

export default ServicesMontly;