// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import md5gen from 'md5';
import NumberFormat from 'react-number-format';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Assets
import '../../Modules/Resume/Resume.css';
import formato from '../../images/formato_consignacion.jpg';

//Components declaration
import Footer from '../../Footer'

class Resume extends Component {
  
  constructor(){
    super();

    this.handleCalculateTotalPayFee = this.handleCalculateTotalPayFee.bind(this);
    this.handleMd5Generator         = this.handleMd5Generator.bind(this);
    this.handlePayment              = this.handlePayment.bind(this);
    this.handleTotalPay             = this.handleTotalPay.bind(this);
    this.toggle                     = this.toggle.bind(this);
    this.toggle_modal               = this.toggle_modal.bind(this);
    this.handleOnChangeBuyer        = this.handleOnChangeBuyer.bind(this);
    this.handlePrintData            = this.handlePrintData.bind(this);
    this.handlePayOnlineData        = this.handlePayOnlineData.bind(this);

    this.state = {

      // Form values
      payuIdMerchant: '578320',

      // payment data
      seguro               : 0,
      anuario              : 0,
      asopadres            : 0,
      club                 : 0,
      biblio               : 0,
      matricula_tarifa     : 0,
      matricula_tarifa_15  : 0,
      matricula_tarifa_7_5 : 0,
      tot_matricula        : 0,
      tot_servicios        : 0,
      tot_pagar            : 0,
      tot_solo_dto         : 0,
      fee                  : 3.49,
      fee_cop              : 900,
      fee_iva              : 0.19,
      tot_tarifa           : 0,
      codigo               : '',
      nombres              : '',
      apellidos            : '',
      grado                : '',
      objectId             : '',

      // PayU Parameter
      monto            : 0,
      codigoReferencia : '',
      firmaMd5         : '',

      // UI States
      modal: false,
      modal_print: false,
      collapse: false,
      isPayButtonDisabled: true,

      // Form UI Filled?
      isFilledName : false,
      isFilledEmail : false,
      isFilledAddress : false,
      isFilledPhone : false,

      // BuyerData
      buyerName: '',
      buyerPhone: '',
      buyerEmail: '',
      buyerAddress: ''

    }
  }

  componentDidMount(){
    var servicesObj = this.props.location.state;
    console.log("Services data: " + JSON.stringify(servicesObj));

    /*this.setState({
        biblio               : servicesObj.bibliobanco,
        matricula_tarifa     : servicesObj.matricula,
        matricula_tarifa_15  : servicesObj.matricula_15,
        matricula_tarifa_7_5 : servicesObj.matricula_7_5,
        anuario              : servicesObj.anuario,
        asopadres            : servicesObj.asopadres,
        club                 : servicesObj.club,
        seguro               : servicesObj.seguro,
        tot_matricula        : servicesObj.total_descuentos,
        tot_servicios        : servicesObj.total_servicios,
        tot_pagar            : servicesObj.total_pagar,
        tot_solo_dto         : servicesObj.total_solo_dtos,
        
        // Student Data
        codigo           : servicesObj.codigo,
        nombres          : servicesObj.nombres,
        apellidos        : servicesObj.apellidos,
        grado            : servicesObj.grado,
        objectId         : servicesObj.uid,
        
    }, () => {
        //this.handleCalculateTotalPayFee();
    });*/
  }

  handleCalculateTotalPayFee = () =>{
    this.setState({
      tot_tarifa : Number(
                          (((this.state.tot_pagar * this.state.fee)/100) + this.state.fee_cop) 
                         +((((this.state.tot_pagar * this.state.fee)/100) + this.state.fee_cop) * this.state.fee_iva)
                        )
    }, () => {
      this.handleTotalPay();
    })
  }

  handleTotalPay(){
    this.setState({
      monto : Number(this.state.tot_tarifa + this.state.tot_pagar)

    }, () => {
      //console.log("Total amount: " + Math.round(this.state.monto));
      this.handleMd5Generator();
    })
  }

  handleMd5Generator = () =>{
      var referencecod = this.handleReferencecode(this.state.codigo);
      var monto_pagar = Math.round(this.state.monto);
      var md5string = md5gen( "BZRTxRkjDDYBuXHE2V52d56iWN" + "~" + "578320" + "~" + referencecod + "~" + monto_pagar + "~" + "COP" );

      this.setState({
        firmaMd5: md5string
      }, () => {
        //console.log("MD5 =>" + md5string);
      })
  }

  handleReferencecode = (inDatum) =>{
      var today = new Date();
      var date = today.getFullYear() +""+ (today.getMonth() + 1) +""+ today.getDate();
      var time = + today.getHours() +""+ today.getMinutes();
      //var time = + today.getHours();
      var referenceCode = "MAT" + inDatum +"-"+ date + "" + time;
      //console.log(referenceCode);

      this.setState({
        codigoReferencia: referenceCode
      })

      return referenceCode;
  }

  nextPath = () => {
    var services              = {};
    services.matricula        = this.state.tot_matricula;
    services.matricula_15     = this.state.matricula_tarifa_15;
    services.matricula_7_5    = this.state.matricula_tarifa_7_5;
    services.bibliobanco      = this.state.biblio;
    services.tarifa_matricula = this.state.matricula_tarifa;
    services.asopadres        = this.state.asopadres;
    services.anuario          = this.state.anuario;
    services.seguro           = this.state.seguro;
    services.club             = this.state.club;
    services.total_servicios  = this.state.tot_servicios;
    services.total_pagar      = this.state.tot_pagar;
    services.total_solo_dtos  = this.state.tot_solo_dto;
    // Student data
    services.codigo           = this.state.codigo;
    services.nombres          = this.state.nombres;
    services.apellidos        = this.state.apellidos;
    services.grado            = this.state.grado;
    services.uid              = this.state.objectId;

    this.props.history.push('/print', services);
    this.handlePrintData();
  }

  handlePayment = () =>{
      this.handleMd5Generator();
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
    this.handlePayOnlineData();
  }
  
  toggle_modal() {
    this.setState({ modal_print: !this.state.modal_print });
  }

  toggleEnablePaymentButton = () =>{
      //console.log("Filled: Name " + this.state.isFilledName + " Email: " + this.state.isFilledEmail + " Phone: " + this.state.isFilledPhone + " Address: " + this.state.isFilledAddress);     
      if(    this.state.isFilledName === true 
          && this.state.isFilledEmail === true 
          && this.state.isFilledAddress === true 
          && this.state.isFilledPhone === true ){
          
          this.setState({
            isPayButtonDisabled : false
          })  

      }else{
          this.setState({
            isPayButtonDisabled : true
          })
      }
  }

  handleOnChangeBuyer = (e) =>{
    if(e.target.id === 'inputBuyerName'){
      this.setState({
        buyerName: String(e.target.value)
      }, () => {
        console.log(this.state.buyerName)
        if(this.state.buyerName.length > 0){
            this.setState({
              isFilledName: true
            }, () => {
              this.toggleEnablePaymentButton();
            })
        }else{
            this.setState({
              isFilledName: false
            }, () => {
              this.toggleEnablePaymentButton();
            })
        }
      })
    }
    
    if(e.target.id === 'inputBuyerEmail'){
      this.setState({
        buyerEmail: String(e.target.value)
      }, () => {
        console.log(this.state.buyerEmail)
        if(this.state.buyerEmail.length > 0){
          this.setState({
            isFilledEmail: true
          }, () => {
            this.toggleEnablePaymentButton();
          })
        }else{
            this.setState({
              isFilledEmail: false
            }, () => {
              this.toggleEnablePaymentButton();
            })
        }
      })
    }
    
    if(e.target.id === 'inputBuyerPhone'){
      this.setState({
        buyerPhone: String(e.target.value)
      }, () => {
        console.log(this.state.buyerPhone)
        if(this.state.buyerPhone.length > 0){
          this.setState({
            isFilledPhone: true
          }, () => {
            this.toggleEnablePaymentButton();
          })
        }else{
            this.setState({
              isFilledPhone: false
            }, () => {
              this.toggleEnablePaymentButton();
            })
        }
      })
    }
    
    if(e.target.id === 'inputBuyerAddress'){
      this.setState({
        buyerAddress: String(e.target.value)
      }, () => {
        console.log(this.state.buyerAddress)
        if(this.state.buyerAddress.length > 0){
          this.setState({
            isFilledAddress: true
          }, () => {
            this.toggleEnablePaymentButton();
          })
        }else{
            this.setState({
              isFilledAddress: false
            }, () => {
              this.toggleEnablePaymentButton();
            })
        }
      })
    }  
  }

  handlePrintData(){
    var servicesSelected                 = {};
    var data                             = {};

    //console.log("==> " + this.state.matricula_tarifa + " - " + this.state.biblio);

    // Data Object
    data.codigo                          = this.state.codigo;
    data.total_matricula_biblio          = this.state.tot_matricula;
    data.total_servicios                 = this.state.tot_servicios;
    data.tarifa_matricula                = this.state.matricula_tarifa;
    data.tarifa_biblio                   = this.state.biblio;
    data.total_pagar                     = this.state.tot_pagar;
    data.anuario                         = this.state.anuario;
    data.seguro_accidentes               = this.state.seguro;
    data.asopadres                       = this.state.asopadres;
    data.afiliacion_club                 = this.state.club;

    // Log Object
    servicesSelected.action              = "Print";
    servicesSelected.codigo              = this.state.codigo;
    servicesSelected.data                = data;

    let axiosConfig = {
      headers: {
          'X-Parse-Application-Id': 'U8jcs4wAuoOvBeCUCy4tAQTApcfUjiGmso98wM9h',
          'X-Parse-Master-Key'    : 'vN7hMK7QknCPf2xeazTaILtaskHFAveqnh6NDwi6',
          'Content-Type'          : 'application/json;charset=UTF-8'
      },
    };

    axios.post('https://parseapi.back4app.com/classes/EventsLog', servicesSelected, axiosConfig)
         .then(res => {
             //console.log(res);
         })
         .catch(error => {
            //console.log(error);
         });

  }

  handlePayOnlineData(){
    var servicesSelected                 = {};
    var data                             = {};

    // Data Object
    data.codigo                          = this.state.codigo;
    data.total_matricula_biblio          = this.state.tot_matricula;
    data.total_servicios                 = this.state.tot_servicios;
    data.total_pagar                     = this.state.tot_pagar;
    data.monto                           = this.state.monto;
    data.codigoReferencia                = this.state.codigoReferencia;
    data.tot_tarifa                      = this.state.tot_tarifa;
    
    data.anuario                         = this.state.anuario;
    data.seguro_accidentes               = this.state.seguro;
    data.asopadres                       = this.state.asopadres;
    data.afiliacion_club                 = this.state.club;
    // Log Object
    servicesSelected.action              = "Pay Online";
    servicesSelected.codigo              = this.state.codigo;
    servicesSelected.data                = data;

    let axiosConfig = {
      headers: {
          'X-Parse-Application-Id': 'U8jcs4wAuoOvBeCUCy4tAQTApcfUjiGmso98wM9h',
          'X-Parse-Master-Key'    : 'vN7hMK7QknCPf2xeazTaILtaskHFAveqnh6NDwi6',
          'Content-Type'          : 'application/json;charset=UTF-8'
      },
    };

    axios.post('https://parseapi.back4app.com/classes/EventsLog', servicesSelected, axiosConfig)
        .then(res => {   
            console.log(res);      
        })
        .catch(error => {
            console.log(error);
        });

  }

  // Props definitions
  static propTypes = {
    show : PropTypes.string
  }

  render() {
    console.log("Here props: ");
    console.log(this.props)
    
    return (
        <div className="Resume" >
          <main>  
            <div className="album py-3 bg-light" >
              <div className="container">
                <div className="row">
                  <div className="col-md-1"> </div>
                  <div className="col-md-10">
                    <div className="card p-5 bg-light text-dark">
                      <div className="card-body">
                        <div className="row">
                          
                          <div className="col-md-12">
                              <h2 className="">Resumen de costos de matrícula y otros servicios</h2>
                          </div>
                          
                          <div className="col-md-12"> 
                            <div className="py-3">
                              <div className="container">
                                <div className="row">
                                  <div className="col-2"><b>Código</b></div>
                                  <div className="col-4">{this.state.codigo}</div>
                                  <div className="col-2"><b>Grado</b></div>
                                  <div className="col-4">{this.state.grado}</div>
                                </div>
                                <div className="row">
                                  <div className="col-2"><b>Nombres</b></div>
                                  <div className="col-4">{this.state.nombres}</div>
                                  <div className="col-2"><b>Apellidos</b></div>
                                  <div className="col-4">{this.state.apellidos}</div>
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
                                      <td>Matrícula + Bibliobanco</td>
                                      <td><NumberFormat value={this.state.tot_matricula} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr>
                                      <td>Seguro de accidentes</td>
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
                                      <td>Afiliación a club deportivo</td>
                                      <td><NumberFormat value={this.state.club} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr className="bg-primary text-white">
                                      <td ><b>Total a pagar</b></td>
                                      <td><b><NumberFormat value={this.state.tot_pagar} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                                    </tr>
                                    <tr className="">
                                      <td ><b>Imprimir Recibo de Matrícula</b><br/>Este documento debe ser firmado y entregado en día de la matrícula</td>
                                      <td><Button color="primary" onClick={() => this.nextPath()}>Imprimir</Button></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" id="base_table">
                                            <div className="alert alert-primary" role="alert">
                                              <p> <b>Pagar en banco (sin costo adicional):</b> Imprima su recibo y acerquese a la sucursal del <b>Banco de Bogotá</b> más cercana para realizar el pago. </p>
                                              <p> <b>Pagar en línea (con costo adicional):</b> Ofrecemos la facilidad de pago en línea con PayU. Agíl, seguro y desde la comodidad de su casa. (<a href="https://www.payulatam.com/co/tarifas/" rel="noopener noreferrer" target="_blank">Conoce las tarifas de PayU - 3.49% + $900</a>)</p>
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
                                          className="btn btn-secondary btn-lg"
                                          onClick={this.toggle_modal}>
                                          Pagar en banco
                                  </button>
                                  <Modal isOpen={this.state.modal_print} size="lg" toggle={this.toggle_modal} className={this.props.className}>
                                      <ModalHeader toggle={this.toggle_modal}>Formato de Recaudo - Banco de Bogotá</ModalHeader>
                                      <ModalBody>
                                          <div className="alert alert-primary" role="alert">
                                              El siguiente es un ejemplo del <b>Formato Sistema Nacional de Recaudos Comprobante de Pago Universal Nacional</b> que usted debe solicitar en la sucursal bancaría para realizar el pago. Asegúrese de diligenciar los campos de acuerdo a las indicaciones.
                                          </div>
                                          <img src={formato} className="img-fluid" alt="img_formato"/>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button color="secondary" onClick={this.toggle_modal}>Cancelar</Button>
                                      </ModalFooter>
                                  </Modal>
                              </div>
                              <div className="col"></div>
                              <div className="col"></div>
                              <div className="col">
                                  <Button type="button" 
                                          color="success"
                                          size="lg"
                                          onClick={this.toggle} style={{ marginBottom: '1rem' }}>Pagar en línea</Button>

                                  <Modal isOpen={this.state.modal} size="lg" toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Resumen de pago en línea</ModalHeader>
                                    <ModalBody>
                                        <div id="wow" className="col-md-12">
                                            <h6 >Información del pagador</h6>
                                            <div id="little-text" class="alert alert-primary" role="alert">
                                                *Antes de continuar con el pago es importante que diligencie la información del pagador.
                                            </div>
                                        </div>
                                        <div className="form-row">
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" id="inputBuyerName" placeholder="Nombre completo" />
                                          </div>
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" id="inputBuyerEmail" placeholder="Correo eletrónico" />
                                          </div>
                                        </div>
                                        <div className="form-row py-3">
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" id="inputBuyerPhone" placeholder="Teléfono" />
                                          </div>
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" id="inputBuyerAddress" placeholder="Dirección" />
                                          </div>
                                        </div>
                                         
                                        <div className="py-3">
                                          <h6 >Detalle del pago</h6>
                                          <div className="row">
                                            <div className="col-md-12">
                                              <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                      <td >Subtotal a pagar</td>
                                                      <td><NumberFormat value={this.state.tot_pagar} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td >Valor transacción en línea</td>
                                                      <td><NumberFormat value={Math.round(this.state.tot_tarifa)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                                    </tr>
                                                    <tr id="total-pay">
                                                      <td ><b>Total a pagar</b></td>
                                                      <td><b><NumberFormat value={Math.round(this.state.tot_pagar + this.state.tot_tarifa)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                                                    </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div> 
                                          <div className="row"> 
                                                <div className="col-sm"></div>
                                                <div className="col-sm"></div>
                                                <div className="col-sm text-right">
                                                    {/*PayU form*/}
                                                    <form method="post" action="https://checkout.payulatam.com/ppp-web-gateway-payu/" target="_blank">
                                                      <input name="merchantId"       type="hidden"  value={this.state.payuIdMerchant} ></input>
                                                      <input name="referenceCode"    type="hidden"  value={this.state.codigoReferencia} ></input>
                                                      <input name="description"      type="hidden"  value="PAGO MATRICULA ROCHESTER 2018-19" ></input>
                                                      <input name="amount"           type="hidden"  value={Math.round(this.state.monto)} ></input>
                                                      <input name="tax"              type="hidden"  value="0" ></input>
                                                      <input name="taxReturnBase"    type="hidden"  value="0" ></input>
                                                      <input name="signature"        type="hidden"  value={this.state.firmaMd5} ></input>
                                                      <input name="accountId"        type="hidden"  value="581164" ></input>
                                                      <input name="currency"         type="hidden"  value="COP" ></input>
                                                      <input name="buyerFullName"    type="hidden"  value={this.state.buyerName} ></input>
                                                      <input name="buyerEmail"       type="hidden"  value={this.state.buyerEmail} ></input>
                                                      <input name="shippingAddress"  type="hidden"  value={this.state.buyerAddress} ></input>
                                                      <input name="telephone"        type="hidden"  value={this.state.buyerPhone} ></input>
                                                      <input name="shippingCountry"  type="hidden"  value="CO" ></input>
                                                      {/*<input name="test" type="hidden" value="1" ></input>*/}
                                                      <input name="Submit" disabled={this.state.isPayButtonDisabled} type="submit"  value="Ir a Pagar" className="btn btn-success btn-lg" id="button_payu"></input>
                                                    </form>
                                                </div>
                                          </div>
                                        </div>   
                                    </ModalBody>
                                  </Modal>
                              </div>
                            </div>      
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-1"> </div>
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