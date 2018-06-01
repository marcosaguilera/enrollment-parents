// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5gen from 'md5';
import NumberFormat from 'react-number-format';

// Assets
import '../../Modules/Resume/Resume.css';

//Components declaration
import Footer from '../../Footer'

class Resume extends Component {
  
  constructor(){
    super();

    this.handleCalculateTotalPayFee = this.handleCalculateTotalPayFee.bind(this);
    this.handleMd5Generator         = this.handleMd5Generator.bind(this);
    this.handlePayment              = this.handlePayment.bind(this);
    this.handleTotalPay             = this.handleTotalPay.bind(this);

    this.state = {
      // Form values
      payuIdMerchant: '578320',
      // payment data
      seguro        : 0,
      anuario       : 0,
      asopadres     : 0,
      club          : 0,
      tot_matricula : 0,
      tot_servicios : 0,
      tot_pagar     : 0,
      fee           : 3.49,
      fee_cop       : 900,
      tot_tarifa    : 0,
      codigo        : '',
      nombres       : '',
      apellidos     : '',
      grado         : '',
      objectId      : '',
      // PayU Parameter
      monto            : 0,
      codigoReferencia : '',
      firmaMd5         : ''

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
        this.handleCalculateTotalPayFee();
    });
  }

  handleCalculateTotalPayFee = () =>{
    this.setState({
      tot_tarifa    : Number((this.state.tot_pagar * this.state.fee)/100) + this.state.fee_cop
    }, () => {
      console.log("Total Fee: " + Math.round(this.state.tot_tarifa));
      this.handleTotalPay();
    })
  }

  handleTotalPay(){
    this.setState({
      monto : Number(this.state.tot_tarifa + this.state.tot_pagar)

    }, () => {
      console.log("Total amount: " + Math.round(this.state.monto));
      this.handleMd5Generator();
    })
  }

  handleMd5Generator = () =>{
      var referencecod = this.handleReferencecode(this.state.codigo);
      var monto_pagar = Math.round(this.state.monto);
      console.log("=====> " + referencecod + " --- " + monto_pagar);
      var md5string = md5gen( "BZRTxRkjDDYBuXHE2V52d56iWN" + "~" + 
                              "578320" + "~" +
                              referencecod + "~" +
                              monto_pagar + "~" +
                              "COP" );

      this.setState({
        firmaMd5: md5string
      }, () => {
        console.log("MD5 =>" + md5string);
      })
  }

  handleReferencecode = (inDatum) =>{
      var today = new Date();
      var date = today.getFullYear() +""+ (today.getMonth() + 1) +""+ today.getDate();
      var time = + today.getHours() +""+ today.getMinutes();
      //var time = + today.getHours();
      var referenceCode = "MAT" + inDatum +"-"+ date + "" + time;
      console.log(referenceCode);

      this.setState({
        codigoReferencia: referenceCode
      })

      return referenceCode;
  }

  nextPath = () => {
    this.props.history.push('/print');
  }

  handlePayment = () =>{
      this.handleMd5Generator();
  }

  // Props definitions
  static propTypes = {
    show : PropTypes.string
  }

  render() {
    console.log(this.props)
    
    return (
        <div className="Resume" >
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
                                    <tr id="">
                                      <td >Subtotal a pagar</td>
                                      <td><NumberFormat value={this.state.tot_pagar} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr id="payu-fee">
                                      <td >Valor transacción en línea</td>
                                      <td><NumberFormat value={Math.round(this.state.tot_tarifa)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr id="total-pay">
                                      <td ><b>Total a pagar</b></td>
                                      <td><b><NumberFormat value={Math.round(this.state.tot_pagar + this.state.tot_tarifa)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" id="base_table">
                                            <div>
                                              <p> <b>Imprimir (sin costo adicional):</b> Usted podrá descargar e imprimir su recibo de pago y acercarse a la ventanilla del banco a realizar el pago.</p>
                                              <p> <b>Pagar en línea (con costo adicional):</b>  Ofrecemos la facilidad de pago en línea con PayU (<a href="https://www.payulatam.com/co/tarifas/" target="_blank">tarifas PayU</a>). Agíl, seguro y desde la comodidad de su casa.</p>
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
                                  <form method="post" action="https://checkout.payulatam.com/ppp-web-gateway-payu/" target="_blank">
                                    <input name="merchantId"    type="hidden"  value={this.state.payuIdMerchant} ></input>
                                    <input name="referenceCode" type="hidden"  value={this.state.codigoReferencia} ></input>
                                    <input name="description"   type="hidden"  value="PAGO MATRICULA 15000" ></input>
                                    <input name="amount"        type="hidden"  value={Math.round(this.state.monto)} ></input>
                                    <input name="tax"           type="hidden"  value="0" ></input>
                                    <input name="taxReturnBase" type="hidden"  value="0" ></input>
                                    <input name="signature"     type="hidden"  value={this.state.firmaMd5} ></input>
                                    <input name="accountId"     type="hidden"  value="581164" ></input>
                                    <input name="currency"      type="hidden"  value="COP" ></input>
                                    <input name="buyerFullName"    type="hidden"  value="Marcos Aguilera Ely" ></input>
                                    <input name="buyerEmail"    type="hidden"  value="maguilera@rochester.edu.co" ></input>
                                    <input name="shippingAddress"    type="hidden"  value="Calle 152 N 9 57" ></input>
                                    <input name="shippingCity"    type="hidden"  value="Bogotá" ></input>
                                    <input name="shippingCountry"    type="hidden"  value="CO" ></input>
                                    <input name="telephone"    type="hidden"  value="3185309380" ></input>
                                   
                                    <input name="test" type="hidden" value="1" ></input>
                                    <input name="Submit" type="submit"  value="Pagar en línea" className="btn btn-success btn-lg" id="button_payu"></input>
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