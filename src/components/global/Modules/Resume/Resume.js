// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

class Resume extends Component {
  
  constructor(){
    super();

    this.handleCalculateTotalPayFee    = this.handleCalculateTotalPayFee.bind(this);

    this.state = {
      seguro        : 0,
      anuario       : 0,
      asopadres     : 0,
      club          : 0,
      tot_matricula : 0,
      tot_servicios : 0,
      tot_pagar     : 0,
      fee           : 2.9,
      fee_cop       : 900,
      tot_tarifa    : 0,
      codigo        : '',
      nombres       : '',
      apellidos     : '',
      grado         : '',
      objectId      : '' 
    }
  }

  componentDidMount(){
    var servicesObj = this.props.location.state;
    console.log("Services data: " + JSON.stringify(servicesObj));

    this.setState({
        anuario       : servicesObj.anuario,
        asopadres     : servicesObj.asopadres,
        club          : servicesObj.club,
        seguro        : servicesObj.seguro,
        tot_matricula : servicesObj.total_descuentos,
        tot_servicios : servicesObj.total_servicios,
        tot_pagar     : servicesObj.total_pagar,
        // Student Data
        codigo        : servicesObj.codigo,
        nombres       : servicesObj.nombres,
        apellidos     : servicesObj.apellidos,
        grado         : servicesObj.grado,
        objectId      : servicesObj.uid,
        

    }, () => {
        console.log("Calculating fee value");
        this.handleCalculateTotalPayFee();
    });
  }

  handleCalculateTotalPayFee = () =>{
    this.setState({
      tot_tarifa    : Number((this.state.tot_pagar * this.state.fee)/100)+this.state.fee_cop
    })
  }

  // Props definitions
  static propTypes = {
    show : PropTypes.string
  }

  render() {
    console.log(this.props)

    /*if(this.props.show === 'none') {
      return null;
    }    */
    
    return (
      <div className="Resume"> {/*style={{display: this.props.show }} >*/}
        <main>  
          <div className="album py-5 bg-light" >
            <div className="container">
              <div className="row">
                <div className="col-md-2"> </div>
                <div className="col-md-8">
                  <div className="card p-5 bg-light text-dark">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                            <h1 className="">Resumen de servicios</h1>
                        </div>
                        <div className="col-md-12"> 
                            <div className="py-3">
                              <div className="container">
                                <div className="row">
                                  <div className="col-md-3"><b>Código</b></div>
                                  <div className="col-md-9">{this.state.codigo}</div>
                                </div>
                                <div className="row">
                                  <div className="col-md-3"><b>Grado</b></div>
                                  <div className="col-md-9">{this.state.grado}</div>
                                </div>
                                <div className="row">
                                  <div className="col-md-3"><b>Nombres</b></div>
                                  <div className="col-md-9">{this.state.nombres}</div>
                                </div>
                                <div className="row">
                                  <div className="col-md-3"><b>Apellidos</b></div>
                                  <div className="col-md-9">{this.state.apellidos}</div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                      
                      <div className="py-5">
                          <div className="row">
                            <div className="col-md-12">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Concepto</th>
                                    <th>Valor ($)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Matrícula</td>
                                    <td><NumberFormat value={this.state.tot_matricula} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                                  <tr>
                                    <td>Seguro Accidentes</td>
                                    <td><NumberFormat value={this.state.seguro} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                                  <tr>
                                    <td>Anuario</td>
                                    <td><NumberFormat value={this.state.anuario} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                                  <tr>
                                    <td>Asopadres</td>
                                    <td><NumberFormat value={this.state.asopadres} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                                  <tr>
                                    <td>Afiliación Club Deportivo</td>
                                    <td><NumberFormat value={this.state.club} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                                  <tr className="table-primary">
                                    <td ><b>Total Matrícula + Servicios</b></td>
                                    <td><b><NumberFormat value={this.state.tot_pagar} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                                  </tr>
                                  <tr className="table-warning">
                                    <td>Tarifa pasarela ePayCo <br/> 2,99% + 900$</td>
                                    <td><NumberFormat value={this.state.tot_tarifa} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                      </div>

                      <div className="py-3">
                        <div className="col-md-12">
                          <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-primary btn-lg">Imprimir</button>
                            </div>
                            <div class="col"></div>
                            <div class="col"></div>
                            <div class="col">
                                <button type="button" class="btn btn-primary btn-lg">Pagar en línea</button>
                            </div>
                          </div>      
                        </div>
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

export default Resume;