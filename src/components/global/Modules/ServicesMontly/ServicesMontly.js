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
    render() {
        return (
         <div>
            <main role="main"  className="container" id="customStyle">
                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                    <table id="tablePreview" class="table table-hover table-bordered">
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
                                <select class="form-control" id="transportSelector"  style={{ width: '65%', display: 'inherit' }}>
                                    <option value="" >Completo Cercano</option>
                                    <option value="" >Completo Intermedio</option>
                                    <option value="" >Completo Lejano</option>
                                    <option value="" >Medio Cercano</option>
                                    <option value="" >Medio Intermedio</option>
                                    <option value="" >Medio Lejano</option>
                                    <option value="" >Sin servicio</option>
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
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="lunchRadioOptions" id="lunch_yes" value="442000" checked /> 
                                    <label class="form-check-label" for="lunch_yes">Si</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="lunchRadioOptions" id="lunch_no" value="0" />
                                    <label class="form-check-label" for="lunch_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$442.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Medias Nueves</td>
                            <td className="choiceCustomClass">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="snackRadioOptions" id="snack_yes" value="111000" checked /> 
                                    <label class="form-check-label" for="snack_yes">Si</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="snackRadioOptions" id="snack_no" value="0" />
                                    <label class="form-check-label" for="snack_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$111.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Desayuno</td>
                            <td className="choiceCustomClass">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="breakFastRadioOptions" id="breakFast_yes" value="450000" checked /> 
                                    <label class="form-check-label" for="breakFast_yes">Si</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="breakFastRadioOptions" id="breakFast_no" value="0" />
                                    <label class="form-check-label" for="breakFast_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$450.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Seguro de vida</td>
                            <td className="choiceCustomClass">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="lifeSecureRadioOptions" id="lifeSecure_yes" value="65000" checked /> 
                                    <label class="form-check-label" for="lifeSecure_yes">Si</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="lifeSecureRadioOptions" id="lifeSecure_no" value="0" />
                                    <label class="form-check-label" for="lifeSecure_no">No</label>
                                </div>
                            </td>
                            <td className="dtoCustomClass">0</td>
                            <td className="finalValueCustomClass">$65.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Seguro de desempleo</td>
                            <td className="choiceCustomClass">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="jobSecureRadioOptions" id="jobSecure_yes" value="89000" checked /> 
                                    <label class="form-check-label" for="jobSecure_yes">Si</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="jobSecureRadioOptions" id="jobSecure_no" value="0" />
                                    <label class="form-check-label" for="jobSecure_no">No</label>
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