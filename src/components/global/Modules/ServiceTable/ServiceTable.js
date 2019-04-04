import React, { Component } from 'react';
//// Other dependencies
import axios from 'axios';
import NumberFormat from 'react-number-format';
import store from '../../../../ReduxStore/store'

//Styles

class ServiceTable extends Component {

    constructor(){
        super();
        this.state = {
            services : [],
        }

        store.subscribe(() => {
            this.setState({
                services : store.getState().service_data
            })
        })
    }

    componentWillReceiveProps(){
        console.log(this.state.services.Derecho_Matricula_Plena)
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                      <tr className="table-success">
                        <th scope="col">Conceptos</th>
                        <th scope="col"></th>
                        <th scope="col">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Derecho de matrícula plena</td>
                        <td></td>
                        <td><NumberFormat value={this.state.services.Derecho_Matricula_Plena} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Bibliobanco</td>
                        <td></td>
                        <td><NumberFormat value={this.state.bibliobanco} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Derecho de matrícula -7.5% por pago de anualidades futuras</td>
                        <td></td>
                        <td><NumberFormat value={this.state.tarifa_reducida_7_5} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Derecho de matrícula -15% por pago de anualidades futuras</td>
                        <td></td>
                        <td><NumberFormat value={this.state.tarifa_reducida_15} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr className="table-secondary">
                        <td colSpan="2"><b>Descuentos</b></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>&emsp;&emsp;Hijo de ex-alumno</td>
                        <td></td>
                        <td> - <NumberFormat value={this.state.descuento_exalumno} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>&emsp;&emsp;Ex alumno Santa Barbara Preschool</td>
                        <td></td>
                        <td> - <NumberFormat value={this.state.santa_barbara} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>&emsp;&emsp;Ex alumno Jardín Convenio</td>
                        <td></td>
                        <td> - <NumberFormat value={this.state.convenio} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>&emsp;&emsp;2do Hijo</td>
                        <td></td>
                        <td> - <NumberFormat value={this.state.descuento_2do_hno} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>&emsp;&emsp;3er Hijo</td>
                        <td></td>
                        <td> - <NumberFormat value={this.state.descuento_3er_hno} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>&emsp;&emsp;4to Hijo</td>
                        <td></td>
                        <td> - <NumberFormat value={this.state.descuento_4to_hno} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>&emsp;&emsp;Empleado</td>
                        <td></td>
                        <td> - <NumberFormat value={this.state.empleado} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>&emsp;&emsp;Otros</td>
                        <td></td>
                        <td> - <NumberFormat value={this.state.otros} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                    </tbody>
                  </table>
            </div>
        );
    }
}

export default ServiceTable;