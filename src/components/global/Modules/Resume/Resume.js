// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

// Assets
import '../../Modules/Resume/Resume.css';

//Components declaration
import Footer from '../../Footer'

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

  nextPath = () => {
    this.props.history.push('/print');
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
        <div className="Resume" > {/*style={{display: this.props.show }} >*/}
          <main>  
            <div className="album py-3 bg-light" >
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
                                      <td ><b>Total a pagar</b></td>
                                      <td><b><NumberFormat value={this.state.tot_pagar} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" id="base_table">
                                            <div>
                                              <p> <b>Imprimir (sin costo adicional):</b> Usted podrá descargar e imprimir su recibo de pago y acercarse a la ventanilla del banco a realizar el pago.</p>
                                              <p> <b>Pagar en línea (con costo adicional):</b>  Ofrecemos la facilidad de pago en línea con PayU (3.49% + $900). Agíl, seguro y desde la comodidad de su casa.</p>
                                            </div>
                                        </td>        
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                        </div>

                        <div className="py-3">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col">
                                  <button type="button" 
                                          className="btn btn-primary btn-lg"
                                          onClick={() => this.nextPath()}>
                                  Imprimir</button>
                              </div>
                              <div className="col"></div>
                              <div className="col"></div>
                              <div className="col">
                                  <button type="button" className="btn btn-success btn-lg">
                                    Pagar en línea
                                  </button>
                                  <form method="post" action="https://checkout.payulatam.com/ppp-web-gateway-payu/" target="_blank">
                                    <input name="merchantId"    type="hidden"  value="508029"   ></input>
                                    <input name="referenceCode" type="hidden"  value="PAGOMAT15000" ></input>
                                    <input name="description"   type="hidden"  value="PAGO MATRICULA 15000"  ></input>
                                    <input name="amount"        type="hidden"  value="20000"   ></input>
                                    <input name="tax"           type="hidden"  value="0"  ></input>
                                    <input name="taxReturnBase" type="hidden"  value="0" ></input>
                                    <input name="signature"     type="hidden"  value="69da1cab4786ef9832d69ac3a0ced507"  ></input>
                                    <input name="accountId"     type="hidden"  value="581164" ></input>
                                    <input name="currency"      type="hidden"  value="COP" ></input>
                                    <input name="buyerFullName"    type="hidden"  value="Marcos Aguilera Ely" ></input>
                                    <input name="buyerEmail"    type="hidden"  value="maguilera@rochester.edu.co" ></input>
                                    <input name="shippingAddress"    type="hidden"  value="Calle 152 N 9 57" ></input>
                                    <input name="shippingCity"    type="hidden"  value="Bogotá" ></input>
                                    <input name="shippingCountry"    type="hidden"  value="CO" ></input>
                                    <input name="telephone"    type="hidden"  value="3185309380" ></input>
                                   
                                    <input name="test" type="hidden" value="1" ></input>
                                    <input name="Submit" type="submit"  value="Enviar" ></input>
                                  </form>

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

          <Footer copyright="&copy;Colegio Rochester 2018" />  
        </div>
    );
  }
}

export default Resume;