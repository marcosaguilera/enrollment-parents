import React, { Component } from 'react';

//// Other dependencies
import axios from 'axios';
import NumberFormat from 'react-number-format';
import store from '../../../../ReduxStore/store'

//// Addons
//import LoadingModal from '../../Addons/LoadSpinner';
//import ModalUI from '../../Addons/Modal';
//import ModalUI2 from '../../Addons/Modal';

//////// Assets
import '../../Modules/ServicesMontly/ServicesMontly.css';

//Components declaration
import Extracurricular from '../ExtracurricularServices/ExtracurricularServices'

class ServicesMontly extends Component {

    constructor() {
        super();
        this.handleOnChange      = this.handleOnChange.bind(this)
        this.setTotals           = this.setTotals.bind(this)
        this.setMontlyTotal      = this.setMontlyTotal.bind(this)

        this.state = {
            demo_data               : [],
            lodgings                : 0,
            transport               : 0,
            lunch                   : 0,
            snack                   : 0,
            breakFast               : 0,
            lifeSecure              : 0,
            jobSecure               : 0,

            //Discounts
            discountLodgings        : 0,
            discountTransport       : 0,
            discountLunch           : 0,
            discountSnack           : 0,
            discountBreakfast       : 0,
            discountLifeSecure      : 0,
            discountJobSecure       : 0,

            //Total
            totalLodgings           : 0,
            totalTransport          : 0,
            totalLunch              : 0,
            totalSnack              : 0,
            totalBreakfast          : 0,
            totalLifeSecure         : 0,
            totalJobSecure          : 0,
            totalMontlyServices     : 0
        };
    }

    componentDidMount = () => {
        var servicesObj = this.props.location.state;
        console.log("Services data: " + JSON.stringify(servicesObj));
        let url = "https://rcis-backend.herokuapp.com/student/monthlyservices/" + servicesObj.student_code
        axios.get(url)
        .then(res => {
            console.log(res.data[0])
            let montly_data = res.data[0]
            this.setState({
                lodgings    : montly_data.pension,
                transport   : montly_data.transporte,
                lunch       : montly_data.alimentos_almuerzo,
                snack       : montly_data.alimentos_m9,
                breakFast   : montly_data.alimentos_desayuno,
                lifeSecure  : montly_data.seguro_vida,
                jobSecure   : montly_data.seguro_desempleo,

                //discounts
                discountLodgings    : montly_data.pension_descuento,
                discountTransport   : montly_data.transporte_descuento,
                discountLunch       : montly_data.alimentos_almuerzo_descuento,
                discountSnack       : montly_data.alimentos_m9_descuento,
                discountBreakfast   : montly_data.alimentos_desayuno_descuento,
                discountLifeSecure  : montly_data.seguro_vida_descuento,
                discountJobSecure   : montly_data.seguro_desempleo_descuento,
            }, () => {
                this.setTotals()
            })
        })
    };

    setTotals = () => {
        console.log("-> Pensión: " + this.state.lodgings  )
        console.log("-> Transporte: " + this.state.transport)
        console.log("-> Almuerzo: " + this.state.lunch     )
        console.log("-> M9: " + this.state.snack     )
        console.log("-> Desayuno: " + this.state.breakFast )
        console.log("-> Seguro de vida: " + this.state.lifeSecure)
        console.log("-> Seguro empleo: " + this.state.jobSecure )
        this.setState({
            totalLodgings           : Number(this.state.lodgings - this.state.discountLodgings),
            totalTransport          : Number(this.state.transport - this.state.discountTransport),
            totalLunch              : Number(this.state.lunch - this.state.discountLunch),
            totalSnack              : Number(this.state.snack - this.state.discountSnack),
            totalBreakfast          : Number(this.state.breakFast - this.state.discountBreakfast),
            totalLifeSecure         : Number(this.state.lifeSecure - this.state.discountLifeSecure),
            totalJobSecure          : Number(this.state.jobSecure - this.state.discountJobSecure)
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
                                    this.state.totalJobSecure
        })
    }

    handleOnChange(e){
        if(e.target.id === 'transportSelector'){
            this.setState({ transport: Number(e.target.value) }, () => {
                this.setTotals()
            })
        }

        //Lunch onChange Actions
        if(e.target.id === 'lunch_yes'){
            this.setState({ lunch: Number(e.target.value) }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'lunch_no'){
            this.setState({ lunch: 0 }, () => {
                this.setTotals()
            })
        }

        //Snack onChange Actions
        if(e.target.id === 'snack_yes'){
            this.setState({ snack: Number(e.target.value) }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'snack_no'){
            this.setState({ snack: 0 }, () => {
                this.setTotals()
            })
        }

        //Breakfast onChange Actions
        if(e.target.id === 'breakFast_yes'){
            this.setState({ breakFast: Number(e.target.value) }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'breakFast_no'){
            this.setState({ breakFast: 0 }, () => {
                this.setTotals()
            })
        }

        //LifeSecure onChange Actions
        if(e.target.id === 'lifeSecure_yes'){
            this.setState({ lifeSecure: Number(e.target.value) }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'lifeSecure_no'){
            this.setState({ lifeSecure: 0 }, () => {
                this.setTotals()
            })
        }

        //jobSecure onChange Actions
        if(e.target.id === 'jobSecure_yes'){
            this.setState({ jobSecure: Number(e.target.value) }, () => {
                this.setTotals()
            })
        }

        if(e.target.id === 'jobSecure_no'){
            this.setState({ jobSecure: 0 }, () => {
                this.setTotals()
            })
        }
    }

    nextPath = () => {
        this.props.history.push('/enrolment_eco_services');
    }

    render() {
        return (
         <div>
            <main role="main"  className="container" id="customStyle">
                <div className="shadow-sm p-3 mb-5 bg-white rounded">
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
                                <td>Transporte</td>
                                <td className="choiceCustomClass">
                                    <select className="form-control"
                                        id="transportSelector"
                                        style={{ width: '100%', display: 'inherit' }}
                                        onChange={this.handleOnChange}
                                        value={this.state.transport}>
                                            <option value="409000">Completo Cercano</option>
                                            <option value="462000">Completo Intermedio</option>
                                            <option value="536000">Completo Lejano</option>
                                            <option value="259000">Medio Cercano</option>
                                            <option value="276000">Medio Intermedio</option>
                                            <option value="332000">Medio Lejano</option>
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
                                <td>Almuerzo</td>
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
                                <td>Medias Nueves</td>
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
                            <tr>
                                <td>Desayuno</td>
                                <td className="choiceCustomClass">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="breakFastRadioOptions" id="breakFast_yes" value="450000" defaultChecked  onChange={this.handleOnChange}/> 
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
                            </tr>
                            <tr>
                                <td>Seguro de vida</td>
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
                                <td>Seguro de desempleo</td>
                                <td className="choiceCustomClass">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="jobSecureRadioOptions" id="jobSecure_yes" value="89000" defaultChecked  onChange={this.handleOnChange}/> 
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
                                        disabled={this.state.isDisableSelect}>Eco y Club
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                        </table>
                    </div>
                </div>
                {/*<Extracurricular />*/}
            </main>
         </div>
        );
    }
}

export default ServicesMontly;