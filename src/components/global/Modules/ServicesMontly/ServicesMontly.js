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
//import Footer from '../../Footer'

class ServicesMontly extends Component {

    constructor() {
        super();
        this.handleOnChange = this.handleOnChange.bind(this)

        this.state = {
            transporte_seleccionado : 0
        };
    }

    handleOnChange(e){
        if(e.target.id === 'transportSelector'){
            //console.log("Transporte: " + e.target.value);
            this.setState({
                transporte_seleccionado: e.target.value
            }, () => {
                console.log("Transporte updated: " + this.state.transporte_seleccionado);
                //this.handleGetTotalToPay("fromSelection");
            })
        }
    }

    render() {
        return (
         <div>
            <main role="main"  className="container" id="customStyle">
                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                    <table id="tablePreview" className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Servicio</th>
                            <th><center>Selección</center></th>
                            <th><center>Descuento</center></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Pensión</td>
                            <td className="choiceCustomClass"></td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$1.600.000</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Transporte</td>
                            <td className="choiceCustomClass">
                                <select className="form-control" id="transportSelector"  style={{ width: '65%', display: 'inherit' }} onChange={this.handleOnChange}>
                                    <option value="409000" >Completo Cercano</option>
                                    <option value="462000" >Completo Intermedio</option>
                                    <option value="536000" >Completo Lejano</option>
                                    <option value="259000" >Medio Cercano</option>
                                    <option value="276000" >Medio Intermedio</option>
                                    <option value="332000" >Medio Lejano</option>
                                    <option value="0" >Sin servicio</option>
                                    {/* Cuando un padre seleccione un transporte seleccionará si desea tomar modalidad extracurricular */}
                                </select>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$400.000</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Almuerzo</td>
                            <td className="choiceCustomClass">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="lunchRadioOptions" id="lunch_yes" value="442000" defaultChecked /> 
                                    <label className="form-check-label" htmlFor="lunch_yes">Si</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="lunchRadioOptions" id="lunch_no" value="0" />
                                    <label className="form-check-label" htmlFor="lunch_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$442.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Medias Nueves</td>
                            <td className="choiceCustomClass">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="snackRadioOptions" id="snack_yes" value="111000" defaultChecked /> 
                                    <label className="form-check-label" htmlFor="snack_yes">Si</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="snackRadioOptions" id="snack_no" value="0" />
                                    <label className="form-check-label" htmlFor="snack_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$111.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Desayuno</td>
                            <td className="choiceCustomClass">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="breakFastRadioOptions" id="breakFast_yes" value="450000" defaultChecked /> 
                                    <label className="form-check-label" htmlFor="breakFast_yes">Si</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="breakFastRadioOptions" id="breakFast_no" value="0" />
                                    <label className="form-check-label" htmlFor="breakFast_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$450.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Seguro de vida</td>
                            <td className="choiceCustomClass">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="lifeSecureRadioOptions" id="lifeSecure_yes" value="65000" defaultChecked /> 
                                    <label className="form-check-label" htmlFor="lifeSecure_yes">Si</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="lifeSecureRadioOptions" id="lifeSecure_no" value="0" />
                                    <label className="form-check-label" htmlFor="lifeSecure_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$65.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Seguro de desempleo</td>
                            <td className="choiceCustomClass">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="jobSecureRadioOptions" id="jobSecure_yes" value="89000" defaultChecked /> 
                                    <label className="form-check-label" htmlFor="jobSecure_yes">Si</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="jobSecureRadioOptions" id="jobSecure_no" value="0" />
                                    <label className="form-check-label" htmlFor="jobSecure_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$89.000</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr style={{ backgroundColor: 'rgba(0,0,0,.03)' }}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><h5><center>Total</center></h5></td>
                            <td><h5 className="finalValueCustomClass"><NumberFormat value={2500000} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h5></td>
                        </tr>
                    </tfoot>
                    </table>
                </div>
            </main>
         </div>
        );
    }
}

export default ServicesMontly;