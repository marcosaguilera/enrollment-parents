import React, { Component } from 'react';

// Depencies
import axios from 'axios';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import store from '../../../../ReduxStore/store'
import {ToastsContainer, ToastsStore} from 'react-toasts';

import { Button, Card } from 'react-bootstrap';

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

        this.addEcoService    = this.addEcoService.bind(this);
        this.removeEcoService = this.removeEcoService.bind(this);

        this.state = {
            code     : '',
            name     : '',
            lastname : '',
            grade    : '',
            products: [
                { id: 1, name: "Hipster Ultimate", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 299, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg" },
                { id: 2, name: "On Motion Live", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 99, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg" },
                { id: 3, name: "Underground Max", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 149, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-3.jpg" },
                { id: 4, name: "Hipster Ultimate", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 299, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg" },
                { id: 5, name: "On Motion Live", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 99, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg" },
                { id: 6, name: "Underground Max", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 149, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-3.jpg" },
                { id: 7, name: "Hipster Ultimate", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 299, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg" },
                { id: 8, name: "On Motion Live", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 99, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg" },
                { id: 9, name: "Underground Max", description: "These quality short-sleeve crew-neck t-shirts are 100% pre-shrunk cotton. Fit is unisex standard (size up in doubt). S, M, L, XL, XLT, 2XL, 2XLT, 3XL, 3XLT available.", price: 149, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-3.jpg" },
            ],
            services: [],
            cartServices : [],
            totalAmmountCart : 0,
            step3_data: {},
            isReadyDemographicComponent : false,
            showingAlert: false

        }
    }

    componentDidMount() {
        let servicesObj = this.props.location.state;
        console.log("===> Extracurricular Step");
        console.log(servicesObj);

        this.setState({
            code       : servicesObj.demographic.codigo,
            name       : servicesObj.demographic.nombres,
            lastname   : servicesObj.demographic.apellidos,
            grade      : servicesObj.demographic.grado,
            step3_data : servicesObj,
        }, () => {
            this.setState({ isReadyDemographicComponent : true })
            this.loadEcoServices(this.state.grade)
        })
    }

    loadEcoServices(grade){
        let url = "https://rcis-backend.herokuapp.com/student/ecoservices/" + grade
        axios.get(url)
            .then(res => {
                console.log(res.data)
                this.setState({ services : res.data })
            })
    }

    addEcoService(data){
        let cart = this.state.cartServices
        let additionValue = this.state.totalAmmountCart
        if(cart.length < 2){
            cart.push(data)
            additionValue += data.value
            console.log(cart)
            this.setState({ cartServices : cart, totalAmmountCart : additionValue }, () => { console.log(this.state.cartServices.length) })
        }else{
            //alert("No puedes agregar mas actividades.")
            ToastsStore.warning("No puedes agregar mas actividades.")
        }
    }

    removeEcoService(data){
        let cart = this.state.cartServices
        let substractValue = this.state.totalAmmountCart
        if(cart.length >= 0){
            let pos = cart.indexOf(data);
            console.log(pos)
            cart.splice(pos,1)
            substractValue = this.state.totalAmmountCart - data.value
            //cart.pop(data)
            this.setState({ cartServices : cart, totalAmmountCart : substractValue })
        }  
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
                                            <h5 className="card-title cardTitleCustom">{service.name}</h5>
                                            <p className="card-text cardDescriptionTextCustom">{service.description}</p>
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
                                                    {cart.name}
                                                    <p>
                                                        <span class="badge badge-primary badge-pill">
                                                            <NumberFormat value={cart.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                        </span>
                                                    </p>
                                                </div>
                                                <div id="li-right">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-light btn-sm"
                                                        onClick={ () => this.removeEcoService(cart) }>Remove</button>
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