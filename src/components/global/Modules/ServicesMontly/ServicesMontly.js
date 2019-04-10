import React, { Component } from 'react';
//// Other dependencies
import axios from 'axios';
import NumberFormat from 'react-number-format';
import store from '../../../../ReduxStore/store'

//// Addons
import LoadingModal from '../../Addons/LoadSpinner';
import ModalUI from '../../Addons/Modal';
import ModalUI2 from '../../Addons/Modal';

//////// Assets
import '../../Modules/Services/Services.css';

//Components declaration
import Footer from '../../Footer'
import ServiceTbale from '../ServiceTable/ServiceTable'

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
                            <th>Selección</th>
                            <th>Descuento</th>
                            <th>Total Pagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Pensión</td>
                            <td>
                                
                            </td>
                            <td>0</td>
                            <td>$1.600.000</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Transporte</td>
                            <td>
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>Completo Cercano</option>
                                    <option>Completo Intermedio</option>
                                    <option>Completo Lejano</option>
                                    <option>Medio Cercano</option>
                                    <option>Medio Intermedio</option>
                                    <option>Medio Lejano</option>
                                    <option>Sin servicio</option>
                                    {/* Cuando un padre seleccione un transporte seleccionará si desea tomar modalidad extracurricular */}
                                </select>
                            </td>
                            <td>0</td>
                            <td>$400.000</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Almuerzo</td>
                            <td>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="lunchRadioOptions" id="inlineRadio1" value="option1" checked /> 
                                    <label class="form-check-label" for="inlineRadio1">Si</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="lunchRadioOptions" id="inlineRadio2" value="option2" />
                                    <label class="form-check-label" for="inlineRadio2">No</label>
                                </div>
                            </td>
                            <td>0</td>
                            <td>$700.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Medias Nueves</td>
                            <td>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="snackRadioOptions" id="inlineRadio1" value="option1" checked /> 
                                    <label class="form-check-label" for="inlineRadio1">Si</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="snackRadioOptions" id="inlineRadio2" value="option2" />
                                    <label class="form-check-label" for="inlineRadio2">No</label>
                                </div>
                            </td>
                            <td>0</td>
                            <td>$450.000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Desayuno</td>
                            <td>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="snackRadioOptions" id="inlineRadio1" value="option1" checked /> 
                                    <label class="form-check-label" for="inlineRadio1">Si</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="snackRadioOptions" id="inlineRadio2" value="option2" />
                                    <label class="form-check-label" for="inlineRadio2">No</label>
                                </div>
                            </td>
                            <td>0</td>
                            <td>$450.000</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </main>
         </div>
        );
    }
}

export default ServicesMontly;