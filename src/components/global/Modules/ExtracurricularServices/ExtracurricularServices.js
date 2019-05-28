import React, { Component } from 'react';

// Depencies
import axios from 'axios';
import NumberFormat from 'react-number-format';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import changeCase from 'change-case';
import Truncate from 'react-truncate';
import { FaTrashAlt, FaInfo, FaCalendarCheck } from "react-icons/fa";

// Utils
import Utils from '../../../../Utils/Utils'
import Texts from '../../../../Utils/Texts'

//// Components
import Demographic from '../Demographic/Demographic'
import Footer from '../../Footer'
import Help from '../../Addons/Help'

//Styles
import "./ExtracurricularServices.css"
import img1 from '../../images/svgid5.svg';
import img2 from '../../images/svgid11.svg';
import img3 from '../../images/svgid21.svg';
import img4 from '../../images/svgid24.svg';
import img5 from '../../images/svgid1.svg';

const styles = {
	products: {
		display: 'flex',
		alignItems: 'stretch',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	product: {
		width: '220px',
		marginLeft: 10,
		marginRight: 10
	}
};

class ExtracurricularServices extends Component {
	constructor(props) {
		super(props);

		this.addEcoService          = this.addEcoService.bind(this);
		this.removeEcoService       = this.removeEcoService.bind(this);
		this.showInfo               = this.showInfo.bind(this);
		this.onChangeSelectors      = this.onChangeSelectors.bind(this);
		this.checkCompleteTransport = this.checkCompleteTransport.bind(this);
		this.renderEcoActivities    = this.renderEcoActivities.bind(this);

		this.state = {
			code                        : '',      showElementTransport      : false,
			name                        : '',      authorizedPeople1Name     : '',
			lastname                    : '',      authorizedPeople1Dni      : '',
			grade                       : '',      authorizedPeople1Phone    : '',
			services                    : [],      authorizedPeople1Relation : '',
			cartServices                : [],      authorizedPeople2Name     : '',
			totalAmmountCart            : 0,	   authorizedPeople2Dni      : '',
			step3_data                  : {},	   authorizedPeople2Phone    : '',
			showingAlert                : false,   authorizedPeople2Relation : '',
			isReadyDemographicComponent : false,
			existsEcoSubscription       : true,

			//SELECTED TRANSPORT NAME
			selectedTransportName		: '',
			pickedTransportName			: '',
			selectedPoint				: '',
			selectedLinealFee			: 0,
			selectedDoorFee				: 0,
			selectedSnack				: 0,
			linealTransportName			: '',
			doorTransportName			: '',
			transportNameMode			: '',
			snackEcoName				: '',
			totalEcoTransAmmount        : 0,

			//UX/UI showing
			showLinealPoints		    : 'none',
			showLinealFees				: 'none',
			showTransportCompleteDoor	: 'none',
			showTransportDoor			: 'none',
		}
	}

	componentDidMount() {
		let servicesObj = this.props.location.state;
		console.log(servicesObj.annual_services[5].select);

		let transportName = servicesObj.montly_services[1].select
		console.log(transportName);

		this.setState({
			code       			  : servicesObj.demographic.codigo,
			name       			  : servicesObj.demographic.nombres,
			lastname   			  : servicesObj.demographic.apellidos,
			grade      			  : servicesObj.demographic.grado,
			selectedTransportName : transportName,
			existsEcoSubscription : Utils.authChecker(servicesObj.annual_services[5].select),
			step3_data            : servicesObj
		}, () => {
			this.setState({ isReadyDemographicComponent : true })
			this.loadEcoServices(this.state.grade)
		})
	}

	checkCompleteTransport(type){
		switch (type) {
			case "Transporte Lineal":
				if( this.state.selectedTransportName.includes("Completo") ){
					this.setState({ 
						showLinealFees : 'none', 
						showLinealPoints : 'initial',
						showTransportCompleteDoor : 'none',
						showTransportDoor: 'none'
					})
				}else{
					this.setState({ 
						showLinealFees : 'initial', 
						showLinealPoints : 'initial',
						showTransportCompleteDoor : 'none',
						showTransportDoor: 'none'
					})
				}
				break;

			case "Transporte Puerta a Puerta":
				if(this.state.selectedTransportName.includes("Completo")){
					this.setState({ 
						showLinealFees : 'none', 
						showLinealPoints : 'none',
						showTransportCompleteDoor : 'initial',
						showTransportDoor: 'none'
					})
				}else{
					this.setState({ 
						showLinealFees : 'none', 
						showLinealPoints : 'none',
						showTransportCompleteDoor : 'none',
						showTransportDoor: 'initial'
					})
				}
				break;

			case "Salida por recepción":
				this.setState({ 
					showLinealFees : 'none', 
					showLinealPoints : 'none',
					showTransportCompleteDoor : 'none',
					showTransportDoor: 'none'
				})
				break;

			case "NA":
				this.setState({ 
					showLinealFees : 'none', 
					showLinealPoints : 'none',
					showTransportCompleteDoor : 'none',
					showTransportDoor: 'none'
				})
				break;

			default:
				this.setState({
					showLinealFees : 'hidden',
					showLinealPoints : 'hidden',
					showTransportCompleteDoor : 'hidden',
					showTransportDoor: 'hidden'
				})
				break;
		}
	}

	totalEcoTransport(){
		this.setState({
			totalEcoTransAmmount: this.state.selectedLinealFee + this.state.selectedDoorFee
		}, () => {
			console.log(this.state.totalEcoTransAmmount)
		})
	}

	onChangeSelectors(e){
		if(e.target.id === 'transportModeSelector'){
			this.setState({ pickedTransportName: e.target.value })

			if(e.target.value === 'Transporte Lineal'){
				this.checkCompleteTransport('Transporte Lineal')
				this.setState({ selectedDoorFee: 0 })
			}
			if(e.target.value === 'Transporte Puerta a Puerta'){
				this.checkCompleteTransport('Transporte Puerta a Puerta')
				this.setState({ selectedLinealFee: 0 })
			}
			if(e.target.value === 'Salida por recepción'){
				this.checkCompleteTransport('Salida por recepción')
				this.setState({ selectedLinealFee: 0, selectedDoorFee: 0  })
			}
			if(e.target.value === 'NA'){
				this.checkCompleteTransport('NA')
				this.setState({ selectedLinealFee: 0, selectedDoorFee: 0  })
			}
		}

		if(e.target.id === 'puntosSelector'){
			this.setState({
				selectedPoint   : e.target.value,
				selectedDoorFee : 0
			}, () =>{ console.log(this.state.selectedPoint) })
		}

		if(e.target.id === 'tarifaLinealSelector'){
			this.setState({
				selectedLinealFee : Number(e.target.value),
				selectedDoorFee   : 0
			}, () =>{
				this.totalEcoTransport()
				this.setState({
					transportNameMode: Utils.getEcoTransportServiceName(this.state.selectedLinealFee, this.state.pickedTransportName) 
				})
			})
		}

		if(e.target.id === 'puertaCompletoSelector'){
			this.setState({
				selectedDoorFee   : Number(e.target.value),
				selectedLinealFee : 0
			}, () =>{
				this.totalEcoTransport()
				this.setState({
					transportNameMode: Utils.getEcoTransportServiceName(this.state.selectedDoorFee) 
				})
			})
		}

		if(e.target.id === 'puertaSelector'){
			this.setState({
				selectedDoorFee   : Number(e.target.value),
				selectedLinealFee : 0
			}, () =>{
				this.totalEcoTransport()
				this.setState({
					transportNameMode: Utils.getEcoTransportServiceName(this.state.selectedDoorFee, this.state.pickedTransportName) 
				})
			})
		}

		if(e.target.id === 'snackSelector'){
			//let element = document.getElementById('snackSelector')
			//let optionText = element.options[element.selectedIndex].text
			//console.log(optionText)
			this.setState({
				selectedSnack : Number(e.target.value)
			}, () =>{ 
				this.setState({ snackEcoName : Utils.getSnackEcoName(this.state.selectedSnack) }, () => { console.log(this.state.snackEcoName) })
			})
		}

		if(e.target.id === 'nombre1'){
			this.setState({ authorizedPeople1Name : e.target.value })
		}

		if(e.target.id === 'nombre2'){
			this.setState({ authorizedPeople2Name : e.target.value })
		}

		if(e.target.id === 'identificacion1'){
			this.setState({ authorizedPeople1Dni : e.target.value })
		}

		if(e.target.id === 'identificacion2'){
			this.setState({ authorizedPeople2Dni : e.target.value })
		}

		if(e.target.id === 'telefono1'){
			this.setState({ authorizedPeople1Phone : e.target.value })
		}

		if(e.target.id === 'telefono2'){
			this.setState({ authorizedPeople2Phone : e.target.value })
		}

		if(e.target.id === 'parentesco1'){
			this.setState({ authorizedPeople1Relation : e.target.value })
		}

		if(e.target.id === 'parentesco2'){
			this.setState({ authorizedPeople2Relation : e.target.value })
		}
	}

	loadEcoServices(grade){
		let url = "https://rcis-backend.herokuapp.com/student/ecoservices/" + grade
		axios.get(url)
			.then(res => {
				//console.log(res.data)
				this.setState({ services : res.data }, ()=>{ console.log(this.state.services) })
			})
	}

	async addEcoService(data){
		let cart = this.state.cartServices
		let additionValue = this.state.totalAmmountCart

		let exist = await Utils.existTextMatch(JSON.stringify(cart), data.name)
		//console.log("Exist eco?: " + exist)
		if(!exist){
			if(cart.length < 2){
				cart.push(data)
				additionValue += data.value
				//console.log(cart)
				this.setState({ cartServices : cart, totalAmmountCart : additionValue })
			}else{
				//alert("No puedes agregar mas actividades.")
				ToastsStore.warning("No puedes agregar mas actividades. Son permitidas máximo dos (2) actividades por estudiante")
			}
		}else{
			ToastsStore.warning("Esta actividad ya ha sido agregada")
		}
	}

	removeEcoService(data){
		let cart = this.state.cartServices
		let substractValue = this.state.totalAmmountCart
		if(cart.length >= 0){
			let pos = cart.indexOf(data)
			//console.log(pos)
			cart.splice(pos,1)
			substractValue = this.state.totalAmmountCart - data.value
			//cart.pop(data)
			this.setState({ cartServices : cart, totalAmmountCart : substractValue })
		}
	}

	showInfo(data){
		console.log(data)
	}

	nextPath = () => {
		let step3_data    = this.state.step3_data
		let eco_services  = []
		let transportMode = {}
		let snacks 		  = {}
		let people1   	  = {}
		let people2   	  = {}
		let totals_eco    = {}

        console.log(this.state.cartServices)

		this.state.cartServices.forEach(element => {
			let item	  = {}
			item.type     = "Eco"
			item.code     = element.sap_code
			item.discount = 0
			item.name     = element.name
			item.select   = "Si"
			item.total    = element.value
			item.value    = element.value

			eco_services.push(item)
		});

		transportMode.type       = "Eco"
		transportMode.code       = Utils.getServiceCode(this.state.transportNameMode)
		transportMode.discount   = 0
		transportMode.name       = this.state.pickedTransportName + " // "+ this.state.transportNameMode + " // Curricular: " + this.state.selectedTransportName
		transportMode.select     = this.state.selectedPoint
		transportMode.total      = this.state.totalEcoTransAmmount
		transportMode.value      = this.state.totalEcoTransAmmount

		snacks.type       = "Eco"
		snacks.code       = Utils.getServiceCode(this.state.snackEcoName)
		snacks.discount   = 0
		snacks.name       = "Refrigerio"
		snacks.select     = this.state.snackEcoName
		snacks.total      = this.state.selectedSnack
		snacks.value      = this.state.selectedSnack

		people1.completeName = this.state.authorizedPeople1Name
		people1.dni          = this.state.authorizedPeople1Dni
		people1.phone        = this.state.authorizedPeople1Phone
		people1.relation     = this.state.authorizedPeople1Relation

		people2.completeName = this.state.authorizedPeople2Name
		people2.dni          = this.state.authorizedPeople2Dni
		people2.phone        = this.state.authorizedPeople2Phone
		people2.relation     = this.state.authorizedPeople2Relation

        totals_eco.eco_total_pay = this.state.totalAmmountCart + this.state.totalEcoTransAmmount + this.state.selectedSnack

		step3_data['eco'] = eco_services
		step3_data['eco'].push(transportMode)
		step3_data['eco'].push(snacks)
		step3_data['people_eco'].push(people1)
		step3_data['people_eco'].push(people2)
        step3_data['payments'].push(totals_eco)

        console.log("Final data Step 3: ");
		console.log(step3_data)

		this.props.history.push('/resume', step3_data);
	}

	beforePath = () => {
		//this.props.history.push('/enrolment_monthly_services');
		this.props.history.goBack()
	}

	renderEcoActivities(){
		if(this.state.existsEcoSubscription){
			return this.state.services.map(service =>
				<div className="card cardCustom" key={service.id}>
					{/*<img src={service.image} className="card-img-top cardImgCustom" alt="Service image" />*/}
					<div className="card-body">
						<h5 className="card-title cardTitleCustom">
							<span className="badge badge-secondary badge-pill pillsCustom" style={{ backgroundColor: Utils.colorPicker(service.type) }} >{service.type}</span><br />
							{changeCase.sentenceCase(service.name)}
						</h5>
						{/*<p className="card-text cardDescriptionTextCustom">
							<Truncate lines={3} ellipsis={'...'}>{service.description}</Truncate>
						</p>*/}
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item" style={{ borderTop: '1px solid rgba(0,0,0,.125)', borderBottom: '0px solid', borderRight: '1px solid rgba(0,0,0,.125)', borderLeft: '1px solid rgba(0,0,0,.125)' }}>
							<FaCalendarCheck style={{ height: 18, marginRight: 5 }} />Horario<p style={{ fontSize: 12 }}>{service.schedule}</p>	
						</li>
					</ul>
					<ul className="list-group list-group-flush">
						<li className="list-group-item" style={{ borderTop: '1px solid rgba(0,0,0,.125)', borderBottom: '0px solid', borderRight: '1px solid rgba(0,0,0,.125)', borderLeft: '1px solid rgba(0,0,0,.125)' }}>
							<a href={service.redirect_url} className="card-link" target="_blank">Leer más</a>
						</li>
					</ul>
					<div className="card-footer">
						<div id="boxContainer">
							<div id="box1">
								<button
									id="addActivityBtn"
									className="btn btn-primary"
									onClick={ () => this.addEcoService(service) }>Inscribir</button>
							</div>
							<div id="box2">
								<NumberFormat id="priceSpan" value={service.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
							</div>
						</div>
					</div>
				</div>
			)
		}else{
			let filtered_services = this.state.services.filter(service => service.type !== "Club deportivo")
			console.log("Filtered services")
			console.log(filtered_services)
			return filtered_services.map(service =>
				<div className="card cardCustom" key={service.id}>
					{/*<img src={service.image} className="card-img-top cardImgCustom" alt="Service image" />*/}
					<div className="card-body">
						<h5 className="card-title cardTitleCustom">
							<span className="badge badge-secondary badge-pill pillsCustom" style={{ backgroundColor: Utils.colorPicker(service.type) }} >{service.type}</span><br />
							{changeCase.sentenceCase(service.name)}
						</h5>
						{/*<p className="card-text cardDescriptionTextCustom">
							<Truncate lines={3} ellipsis={'...'}>{service.description}</Truncate>
						</p>*/}
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item" style={{ borderTop: '1px solid rgba(0,0,0,.125)', borderBottom: '0px solid' }}>
							<FaCalendarCheck style={{ height: 18, marginRight: 5 }} />Horario<p style={{ fontSize: 12 }}>{service.schedule}</p>	
						</li>
					</ul>
					<ul className="list-group list-group-flush">
						<li className="list-group-item" style={{ borderTop: '1px solid rgba(0,0,0,.125)', borderBottom: '0px solid' }}>
							<a href={service.redirect_url} className="card-link" target="_blank">Leer más</a>
						</li>
					</ul>
					<div className="card-footer">
						<div id="boxContainer">
							<div id="box1">
								<button
									id="addActivityBtn"
									className="btn btn-primary"
									onClick={ () => this.addEcoService(service) }>Inscribir</button>
							</div>
							<div id="box2">
								<NumberFormat id="priceSpan" value={service.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
							</div>
						</div>
					</div>
				</div>
			)

		}
	}

	render() {
		return (
			<div className="bg-light">
				<main role="main"  className="container" id="customStyle">
					<div className="shadow-sm p-3 mb-5 bg-white rounded">

						{this.state.isReadyDemographicComponent}{
							<Demographic code={this.state.code}
								grade={this.state.grade}
								name={this.state.name}
								lastname={this.state.lastname} />
						}

					<hr/>


					<div className="row py-2">
                        <div className="col-sm">
							<p>Seleccione el transporte extracurricular de su preferencia</p>
                        </div>
                        <div className="col-sm" style={{ textAlign: 'right', marginRight : 2 }}>
                            <Help help_from="step_3" />
                        </div>
                    </div>
					<div className="row">
						<div className="col-md-4">
							<select className="form-control"
									id="transportModeSelector"
									style={{ width: '100%', display: 'inherit' }}
									onChange={this.onChangeSelectors}
									//value={this.state.transport}
									>
										<option value="NA">Seleccione una modalidad</option>
										<option value="Transporte Lineal">Transporte Lineal</option>
										<option value="Transporte Puerta a Puerta">Transporte Puerta a Puerta</option>
										<option value="Salida por recepción">Salida por recepción</option>
							</select>
						</div>
						<div className="col-md-4">
							<select className="form-control"
									id="puntosSelector"
									style={{ width: '100%', display: 'inherit', display: this.state.showLinealPoints }}
									onChange={this.onChangeSelectors}
									//value={this.state.transport}
									>
										<option value="NA" defaultValue>Seleccione un punto</option>
										<option value="Unicentro">Unicentro</option>
										<option value="Cachivaches">Cachivaches (no aplica para quinto a undécimo)</option>
										<option value="Cedritos">Cedritos</option>
										<option value="San Rafael">San Rafael</option>
										<option value="Maloka">Maloka</option>
										<option value="Mazuren">Mazuren (no aplica para quinto a undécimo)</option>
										<option value="Alhambra">Alhambra (no aplica para quinto a undécimo)</option>
										<option value="Bazaar Chía">Bazaar Chía</option>
							</select>
							<select className="form-control"
									id="puertaCompletoSelector"
									style={{ width: '100%', display: 'inherit', display: this.state.showTransportCompleteDoor }}
									onChange={this.onChangeSelectors}
									//value={this.state.transport}
									>
										<option value="0" defaultValue>Seleccione una tarifa</option>
										<option value="58000">1 día - $58.000</option>
										<option value="116000">2 días - $116.000</option>
										<option value="158000">3 días - $158.000</option>
										<option value="200000">4 días - $200.000</option>
										<option value="0" >Sin transporte lineal</option>
							</select>
							<select className="form-control"
									id="puertaSelector"
									style={{ width: '100%', display: 'inherit', display: this.state.showTransportDoor }}
									onChange={this.onChangeSelectors}
									//value={this.state.transport}
									>
										<option value="0" defaultValue>Seleccione una tarifa</option>
										<option value="72000">1 día - $72.000</option>
										<option value="144000">2 días - $144.000</option>
										<option value="198000">3 días - $198.000</option>
										<option value="256000">4 días - $256.000</option>
										<option value="0">Sin transporte puerta a puerta</option>
							</select>
						</div>
						<div className="col-md-4">
							<select className="form-control"
									id="tarifaLinealSelector"
									style={{ width: '100%', display: 'inherit', display: this.state.showLinealFees }}
									onChange={this.onChangeSelectors}
									//value={this.state.transport}
									>
										<option value="0" defaultValue>Seleccione una tarifa</option>
										<option value="48000">1 día semanal - $48.000</option>
										<option value="96000">2 días semanales - $96.000</option>
										<option value="144000">3 días semanales - $144.000</option>
										<option value="192000">4 días semanales - $192.000</option>
										<option value="0">Sin transporte lineal</option>
							</select>
						</div>
					</div>
					<div className="row" style={{ marginTop: 10 }}>
						<div className="col-md-12">
							<p>Refrigerio Extracurricular ECO o Club Deportivo</p>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<select className="form-control"
									id="snackSelector"
									style={{ width: '100%', display: 'inherit' }}
									onChange={this.onChangeSelectors}
									value={this.state.selectedSnack} >
										<option value="0" defaultValue>Seleccione una opción</option>
										<option value="25000">1 día semanal - $25.000</option>
										<option value="45000">2 días semanales - $45.000</option>
										<option value="65000">3 días semanales - $65.000</option>
										<option value="85000">4 días semanales - $85.000</option>
										<option value="0">Sin refrigerio</option>
							</select>
						</div>
						<div className="col-md-4"></div>
						<div className="col-md-4"></div>
					</div>

					<hr/>
					<div className="row" style={{ marginTop: 10 }}>
						<div className="col-md-12">
							<p>{Texts.general_texts[0].authorized_people_eco}</p>
						</div>
					</div>
					<div className="row py-2">
						<div className="col-md-3">
							<input className="form-control" type="text" onChange={this.onChangeSelectors} placeholder="Nombre completo" id="nombre1" />
						</div>
						<div className="col-md-3">
							<input className="form-control" type="text" onChange={this.onChangeSelectors} placeholder="No. identificación" id="identificacion1" />
						</div>
						<div className="col-md-3">
							<input className="form-control" type="text" onChange={this.onChangeSelectors} placeholder="No. teléfono/móvil" id="telefono1" />
						</div>
						<div className="col-md-3">
							<select className="form-control" id="parentesco1" onChange={this.onChangeSelectors}>
								<option value="NA" defaultValue>Elija un parentesco</option>
								<option value="papa">Papá</option>
								<option value="mama">Mamá</option>
								<option value="abuelo(a)">Abuelo(a)</option>
								<option value="hermano(a)">Hermano(a)</option>
								<option value="tio(a)">Tio(a)</option>
								<option value="otro">Otro</option>
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<input className="form-control" type="text" onChange={this.onChangeSelectors} placeholder="Nombre completo" id="nombre2" />
						</div>
						<div className="col-md-3">
							<input className="form-control" type="text" onChange={this.onChangeSelectors} placeholder="No. identificación" id="identificacion2" />
						</div>
						<div className="col-md-3">
							<input className="form-control" type="text" onChange={this.onChangeSelectors} placeholder="No. teléfono/móvil" id="telefono2" />
						</div>
						<div className="col-md-3">
							<select className="form-control" id="parentesco2" onChange={this.onChangeSelectors} >
								<option value="NA" defaultValue>Elija un parentesco</option>
								<option value="papa">Papá</option>
								<option value="mama">Mamá</option>
								<option value="abuelo(a)">Abuelo(a)</option>
								<option value="hermano(a)">Hermano(a)</option>
								<option value="tio(a)">Tio(a)</option>
								<option value="otro">Otro</option>
							</select>
						</div>
					</div>
					<hr/>

					<div className="row">
						<div className="col-md-8">
							<h5 style={{ fontSize: 1.55+'rem' }}>
							    Actividades y costo mensual Eco y Club para el grado {this.state.grade}
							</h5>
							<div style={styles.products}>
								{this.renderEcoActivities()}
							</div>
							<ToastsContainer store={ToastsStore} timer={5000}/>
						</div>
						<div className="col-md-4">
							<div className="card">
								<div className="card-header bg-primary" style={{ padding: '.95rem 1.25rem' }}>
									<h6 id="card_title_color" className="mb-0 text-center">Actividades inscritas</h6>
								</div>
								<div className="card-body" style={{ padding: '0px' }}>
									<ul className="list-group">
										{this.state.cartServices.map(cart =>
											<li id="listContainer" className="list-group-item d-flex justify-content-between align-items-center" key={cart.id} style={{ borderRadius: 0 }}>
												<div id="li-left">
													{changeCase.sentenceCase(cart.name)}
													<p>
														<span className="badge badge-primary badge-pill custom-pill">
															<NumberFormat value={cart.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
														</span>
													</p>
												</div>
												<div id="li-right">
													<button
														type="button"
														className="btn btn-danger btn-sm"
														onClick={ () => this.removeEcoService(cart) }><FaTrashAlt /></button>
												</div>
											</li>
										)}
									</ul>
									<div className="row" style={{ height: 90 }} id="img-container">
										<img id="img1"
											src={ this.state.cartServices.length === 0 ? img4 : img5}
											style={{ opacity: this.state.cartServices.length === 0 ? 0.4 : 0.9 }}
											alt="Image student extracurricular #1" />
										<p id="text-img">{ this.state.cartServices.length === 0 ? 'zZzZzZ' : '¡Coool!' }</p>
									</div>
								</div>
								<div className="card-footer bg-success text-white">
									<div className="row">
										<div className="col-12">
											<center><h5>Total a pagar</h5></center>
										</div>
									</div>
									<div className="row">
										<div className="col-12">
											<center>
												<h5><NumberFormat value={ this.state.totalAmmountCart + this.state.totalEcoTransAmmount + this.state.selectedSnack } displayType={'text'} thousandSeparator={true} prefix={'$'} /></h5>
											</center>
										</div>
									</div>
								</div>
							</div>
							<div className="row py-3">
									<div className="col-12">
										<button type="button"
												className="btn btn-primary btn-lg btn-block"
												onClick={() => this.nextPath()}
												disabled="">Siguiente</button>
									</div>
									<div className="col-12">
										<button type="button"
												className="btn btn-light btn-lg btn-block"
												style={{ marginTop: 5 }}
												onClick={() => this.beforePath()}>Atras</button>
									</div>
							</div>
						</div>
					</div>
				</div>
			</main>
				<Footer copyright="&copy; Colegio Rochester " />
			</div>
		);
	}
}

export default ExtracurricularServices;