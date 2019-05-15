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

		this.addEcoService     = this.addEcoService.bind(this);
		this.removeEcoService  = this.removeEcoService.bind(this);
		this.showInfo          = this.showInfo.bind(this);

		this.state = {
			code             : '',
			name             : '',
			lastname         : '',
			grade            : '',
			services         : [],
			cartServices     : [],
			totalAmmountCart : 0,
			step3_data       : {},
			showingAlert     : false,
			isReadyDemographicComponent : false
		}
	}

	componentDidMount() {
		let servicesObj = this.props.location.state;
		//console.log("===> Extracurricular Step");
		//console.log(servicesObj);

		this.setState({
			code       : servicesObj.demographic.codigo,
			name       : servicesObj.demographic.nombres,
			lastname   : servicesObj.demographic.apellidos,
			grade      : servicesObj.demographic.grado,
			step3_data : servicesObj
		}, () => {
			this.setState({ isReadyDemographicComponent : true })
			this.loadEcoServices(this.state.grade)
		})
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
			ToastsStore.warning("La actividad que intenta inscribir ya ha sido agregada")
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
		let step3_data   = this.state.step3_data
		let eco_services = []
        let totals_eco   = {}

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

        totals_eco.eco_total_pay = this.state.totalAmmountCart

        step3_data['eco'] = eco_services
        step3_data['payments'].push(totals_eco)

        console.log("Final data Step 3: ");
		console.log(step3_data)

		this.props.history.push('/resume', step3_data);
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