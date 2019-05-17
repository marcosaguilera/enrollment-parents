import React, { Component } from 'react';

// Depencies
import axios from 'axios';
import NumberFormat from 'react-number-format';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import changeCase from 'change-case';
import Truncate from 'react-truncate';
import { FaTrashAlt, FaInfo } from "react-icons/fa";
import Utils from '../../../../Utils/Utils.js'

//// Components
import Demographic from '../Demographic/Demographic'

//Styles
import "./ExtracurricularServices.css"

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

		this.state = {
			code                        : '',   showElementTransport : false,
			name                        : '',   
			lastname                    : '',
			grade                       : '',
			services                    : [],
			cartServices                : [],
			totalAmmountCart            : 0,
			step3_data                  : {},
			showingAlert                : false,
			isReadyDemographicComponent : false,

			//SELECTED TRANSPORT NAME
			selectedTransportName		: '',
			pickedTransportName			: '',
			selectedPoint				: '',
			selectedLinealFee			: 0,
			selectedDoorFee				: 0,
			linealTransportName			: '',
			doorTransportName			: '',
			transportNameMode			: '',
			snackEcoName				: '',

			//UX/UI showing
			showLinealPoints		    : 'none',
			showLinealFees				: 'none',
			showTransportCompleteDoor	: 'none',
			showTransportDoor			: 'none',
		}
	}

	componentDidMount() {
		let servicesObj = this.props.location.state;
		//console.log("===> Extracurricular Step");
		
		let transportName = servicesObj.montly_services[1].select
		console.log(transportName);

		this.setState({
			code       			  : servicesObj.demographic.codigo,
			name       			  : servicesObj.demographic.nombres,
			lastname   			  : servicesObj.demographic.apellidos,
			grade      			  : servicesObj.demographic.grado,
			selectedTransportName : transportName,
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

	onChangeSelectors(e){
		if(e.target.id === 'transportModeSelector'){
			console.log(e.target.value)
			
			this.setState({ pickedTransportName: e.target.value })
			
			if(e.target.value === 'Transporte Lineal'){
				this.checkCompleteTransport('Transporte Lineal')
			}
			if(e.target.value === 'Transporte Puerta a Puerta'){
				this.checkCompleteTransport('Transporte Puerta a Puerta')
			}
			if(e.target.value === 'Salida por recepción'){
				this.checkCompleteTransport('Salida por recepción')
			}
			if(e.target.value === 'NA'){
				this.checkCompleteTransport('NA')
			}
		}

		if(e.target.id === 'puntosSelector'){
			this.setState({
				selectedPoint : e.target.value
			}, () =>{ console.log(this.state.selectedPoint) })
		}

		if(e.target.id === 'tarifaLinealSelector'){
			this.setState({
				selectedLinealFee : Number(e.target.value)
			}, () =>{ 
				this.setState({ transportNameMode: Utils.getEcoTransportServiceName(this.state.selectedLinealFee) 
				}, () => { console.log(this.state.linealTransportName) }) 
			})
		}

		if(e.target.id === 'puertaCompletoSelector'){
			this.setState({
				selectedDoorFee : Number(e.target.value)
			}, () =>{ 
				this.setState({ transportNameMode: Utils.getEcoTransportServiceName(this.state.selectedDoorFee) 
				}, () => { console.log(this.state.linealTransportName) }) 
			})
		}

		if(e.target.id === 'puertaSelector'){
			this.setState({
				selectedDoorFee : Number(e.target.value)
			}, () =>{ 
				this.setState({ transportNameMode: Utils.getEcoTransportServiceName(this.state.selectedDoorFee) 
				}, () => { console.log(this.state.linealTransportName) }) 
			})
		}

	}

	loadEcoServices(grade){
		let url = "https://rcis-backend.herokuapp.com/student/ecoservices/" + grade
		axios.get(url)
			.then(res => {
				//console.log(res.data)
				this.setState({ services : res.data })
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
		
		transportMode.type     = "Eco"
		transportMode.code     = Utils.getServiceCode(this.state.transportNameMode)
		transportMode.discount = 0
		transportMode.name     = this.state.pickedTransportName + " // "+ this.state.linealTransportName + " // Curricular: " + this.state.selectedTransportName
		transportMode.select   = this.state.selectedPoint
		transportMode.total    = this.state.selectedLinealFee
		transportMode.value    = this.state.selectedLinealFee

        totals_eco.eco_total_pay = this.state.totalAmmountCart

		step3_data['eco'] = eco_services
		step3_data['eco'].push(transportMode)
        step3_data['payments'].push(totals_eco)

        console.log("Final data Step 3: ");
		console.log(step3_data)

		//this.props.history.push('/resume', step3_data);
	}

	render() {
		return (
			<div className="ecoMainContainer">
				<main role="main"  className="container" id="customStyle">
					<div className="p-3 mb-5 bg-white rounded">

						{this.state.isReadyDemographicComponent}{
							<Demographic code={this.state.code}
								grade={this.state.grade}
								name={this.state.name}
								lastname={this.state.lastname} />
						}

					<hr/>
					
					<div className="row">
						<div className="col-md-12">
							<p>Seleccione la modalidad de transporte de su preferencia</p>
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
										<option value="Cachivaches">Cachivaches</option>
										<option value="Cedritos">Cedritos</option>
										<option value="San Rafael">San Rafael</option>
										<option value="Maloka">Maloka</option>
										<option value="Mazuren">Mazuren</option>
										<option value="Alhambra">Alhambra</option>
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
							</select>
						</div>
						
					</div>
					<div className="row">
						<div className="col-md-12">there</div>
					</div>

					<hr/>

					<div className="row">
						<div className="col-md-8">
							<div style={styles.products}>
								{this.state.services.map(service =>
									<div className="card cardCustom" key={service.id}>
										{/*<img src={service.image} className="card-img-top cardImgCustom" alt="Service image" />*/}
										<div className="card-body">
											<h5 className="card-title cardTitleCustom">
												{changeCase.sentenceCase(service.name)}
												<span className="badge badge-secondary badge-pill pillsCustom" onClick={ () => this.showInfo(service)} ><FaInfo /></span>
											</h5>
											<p className="card-text cardDescriptionTextCustom">
												<Truncate lines={3} ellipsis={'...'}>{service.description}</Truncate>
											</p>
										</div>
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
								)}
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
									<div className="row" style={{ height: 90 }}/>
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
												<h5><NumberFormat value={this.state.totalAmmountCart} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h5>
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
							</div>
						</div>
					</div>
				</div>
				</main>
			</div>
		);
	}
}

ExtracurricularServices.propTypes = {

};



export default ExtracurricularServices;