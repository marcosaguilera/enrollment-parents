import React, { Component } from 'react';

//// Other dependencies
import NumberFormat from 'react-number-format';
import store from '../../../../ReduxStore/store'

//Styles
import "./ServiceTable.css"

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
        //console.log(this.state.services.Derecho_Matricula_Plena)
    }

    render() {
        return (
            <div>
                <table className="table table-bordered table-hover" >
                    <thead>
                      <tr className="tableHeader">
                        <th scope="col">Conceptos</th>
                        <th scope="col">Valor (COP)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Derecho de matrícula plena</td>
                        <td><NumberFormat value={this.state.services.Derecho_Matricula_Plena} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Bibliobanco</td>
                        <td><NumberFormat value={this.state.services.Bibliobanco} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Derecho de matrícula 50% por pago de anualidades futuras</td>
                        <td><NumberFormat value={this.state.services.Derecho_por_pago_anualidades_7_5} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Derecho de matrícula 100% por pago de anualidades futuras</td>
                        <td><NumberFormat value={this.state.services.Derecho_por_pago_anualidades_15} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr className="table-secondary">
                        <td colSpan="2"><b>Becas</b></td>
                      </tr>
                      <tr>
                        <td className="indentLeftText">Hijo de ex-alumno</td>
                        <td> - <NumberFormat value={this.state.services.Hijo_Exalumno} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td className="indentLeftText">Ex alumno Santa Barbara Preschool</td>
                        <td> - <NumberFormat value={this.state.services.SantaBarbara} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td className="indentLeftText">Ex alumno Jardín Convenio</td>
                        <td> - <NumberFormat value={this.state.services.Jardin_Convenio} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td className="indentLeftText">2do Hijo</td>
                        <td> - <NumberFormat value={this.state.services.Hijo_2} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td className="indentLeftText">3er Hijo</td>
                        <td> - <NumberFormat value={this.state.services.Hijo_3} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td className="indentLeftText">4to Hijo</td>
                        <td> - <NumberFormat value={this.state.services.Hijo_4} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td className="indentLeftText">Empleado</td>
                        <td> - <NumberFormat value={this.state.services.Empleado} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td className="indentLeftText">Otros</td>
                        <td> - <NumberFormat value={this.state.services.Otros} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr style={{ backgroundColor: 'rgba(0,0,0,.03)' }}>
                        <td><h5 className="customTotalValue">Total</h5></td>
                        <td><h5 className="customTotalValue"><NumberFormat value={this.state.services.total_conceptos_matricula_descuentos} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h5></td>
                      </tr>
                    </tfoot>
                  </table>
            </div>
        );
    }
}

export default ServiceTable;