// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import md5gen from 'md5';
import NumberFormat from 'react-number-format';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { PDFViewer } from '@react-pdf/renderer';

// Assets
import '../../Modules/Resume/Resume.css';
import formato from '../../images/formato_consignacion.jpg';

//Components declaration
import Footer from '../../Footer'
import PrintPage from '../Print/Print'
import PdfViewer from '../Print_test/PdfViewer'
import PrintTest from '../Print_test/testtwo'

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
    this.handleOnChange             = this.handleOnChange.bind(this);
    this.confirmEnrollment          = this.confirmEnrollment.bind(this);
    this.confirmModal               = this.confirmModal.bind(this);
    this.getDescripcionFactura      = this.getDescripcionFactura.bind(this);
    this.getNowDate                 = this.getNowDate.bind(this);

    this.state = {

      // PayU states
      payuIdMerchant: '578320',
      
      //TuCompra states
      usuario            : 'cctjt208e6j40fdp',
      factura_numero     : '',
      descripcionFactura : 'MAT201920-',
      tokenSeguridad     : '39639af8a6ef4eae9c998b82ed2c5666',
      payment_token      : '',

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
      togglePdfViewer : false,

      // Form UI Filled?
      isFilledName     : false,
      isFilledLastName : false,
      isFilledEmail    : false,
      isFilledAddress  : false,
      isFilledPhone    : false,
      isFilledDoctype  : false,
      isFilledDni      : false,

      // BuyerData
      buyerDni         : '',
      buyerDocType     : 'CC',
      buyerName        : '',
      buyerLastName    : '',
      buyerPhone       : '',
      buyerEmail       : '',
      buyerAddress     : '',

      // Totals from big object
      total_yearly_services   : 0,
      total_montly_services   : 0,
      total_eco_club_services : 0,
      sub_total_annual        : 0,

      // Payment selection
      payment_selection       : 'unico',
      bigTotalPayment         : 0,
      bigTotalPaymentSavings  : 0,
      confirmAction           : 'collapse',
      toggleConfirmModal      : false,
      confirmText             : '',
      confirmButtonDisabled   : true,
    }
  }

  componentDidMount(){
    var servicesObj = this.props.location.state;
    console.log(servicesObj);

    this.setState({
        enrollment_token        : servicesObj.token,
        codigo                  : servicesObj.demographic.codigo,
        nombres                 : servicesObj.demographic.nombres,
        apellidos               : servicesObj.demographic.apellidos,
        grado                   : servicesObj.demographic.grado,

        total_yearly_services   : servicesObj.payments[0].annual_total_to_pay,
        total_montly_services   : servicesObj.payments[1].montly_total_pay,
        total_eco_club_services : servicesObj.payments[2].eco_total_pay
    }, () => {
        this.setState({
          sub_total_annual : this.state.total_yearly_services + ( (this.state.total_montly_services + this.state.total_eco_club_services)*10 )
        }, () => { this.calculateTotalPay(this.state.payment_selection) })
    })
  }

  calculateTotalPay(selection){
    console.log(selection)
    switch (selection) {
      case "unico":
        let total_one_payment       = this.state.total_yearly_services + (( (this.state.total_montly_services + this.state.total_eco_club_services) * 10 ) * 0.95 )
        let total_one_payment_saves = ( (this.state.total_montly_services + this.state.total_eco_club_services) * 10 ) * 0.05
        //console.log("Total one payment: " + total_one_payment + ", Total saves: " + total_one_payment_saves)
        this.setState({ bigTotalPayment : total_one_payment, bigTotalPaymentSavings: total_one_payment_saves })

        break;
      case "dos":
        let total_two_payment       = this.state.total_yearly_services + ((( (this.state.total_montly_services + this.state.total_eco_club_services) * 10 ) * 0.975) / 2)
        let total_two_payment_saves = ( (this.state.total_montly_services + this.state.total_eco_club_services) * 10 ) * 0.025
        //console.log("Total one payment: " + total_two_payment + ", Total saves: " + total_two_payment_saves)
        this.setState({ bigTotalPayment : total_two_payment, bigTotalPaymentSavings: total_two_payment_saves })

        break;
      case "once":
        let total_eleven_payment       = this.state.total_yearly_services
        let total_eleven_payment_saves = 0
        //console.log("Total one payment: " + total_eleven_payment + ", Total saves: " + total_eleven_payment_saves)
        this.setState({ bigTotalPayment : total_eleven_payment, bigTotalPaymentSavings: total_eleven_payment_saves })
        break;

      default:
        break;
    }
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

  printPdf = () =>{
    console.log("print pdf")
    this.setState({ togglePdfViewer: !this.state.togglePdfViewer })
  }

  handlePayment = () =>{
      this.handleMd5Generator();
  }

  confirmModal(){
    this.setState({ toggleConfirmModal: !this.state.toggleConfirmModal })
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
    //this.handlePayOnlineData();
    //this.tuCompraPayment()
  }

  getNowDate(){
      let now         = new Date();
      let now_string  = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+"-"+now.getHours()+":"+now.getMinutes()+":"+now.getMilliseconds();
      return now_string
  }

  getDescripcionFactura(){
    let now = new Date()
    let descripcionFactura = 'MAT201920-' + this.state.enrollment_token +"-"+ this.state.codigo + "-" + this.state.buyerDni + "-" + now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+"-"+now.getHours()+":"+now.getMinutes()   
    return descripcionFactura
  }

  toggle_modal() {
    this.setState({ modal_print: !this.state.modal_print });
  }

  toggleEnablePaymentButton = () =>{
    /*console.log("Name: " + this.state.isFilledName)
    console.log("Lastname: " + this.state.isFilledLastName)
    console.log("Doc type: " + this.state.isFilledDoctype)
    console.log("Doc dni: " + this.state.isFilledDni)
    console.log("Phone: " + this.state.isFilledPhone)
    console.log("Email: " + this.state.isFilledEmail)
    console.log("Address: " + this.state.isFilledAddress)*/
      if(    this.state.isFilledName     === true
          && this.state.isFilledLastName === true
          && this.state.isFilledDoctype  === true
          && this.state.isFilledDni      === true
          && this.state.isFilledEmail    === true
          && this.state.isFilledAddress  === true
          && this.state.isFilledPhone    === true ){

          this.setState({ isPayButtonDisabled : false })
      }else{
          this.setState({ isPayButtonDisabled : true })
      }
  }

  handleOnChange(e){
    if(e.target.id === 'paymentSelector'){
      this.setState({ payment_selection: e.target.value }, () => {
          this.calculateTotalPay(this.state.payment_selection)
      })
    }

    if(e.target.id === 'text-confirm'){
      if(e.target.value === "ACEPTO"){
        this.setState({
          confirmText : 'ACEPTO',
          confirmButtonDisabled : false
        })
      }
      else{
        this.setState({
          confirmText : '',
          confirmButtonDisabled : true
        })
      }
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

    if(e.target.id === 'inputBuyerLastName'){
      this.setState({
        buyerLastName: String(e.target.value)
      }, () => {
        console.log(this.state.buyerLastName)
        if(this.state.buyerLastName.length > 0){
            this.setState({
              isFilledLastName: true
            }, () => {
              this.toggleEnablePaymentButton();
            })
        }else{
            this.setState({
              isFilledLastName: false
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

    if(e.target.id === 'inputBuyerDni'){
      this.setState({
        buyerDni: String(e.target.value)
      }, () => {
        console.log(this.state.buyerDni)
        if(this.state.buyerDni.length > 0){
          this.setState({
            isFilledDni: true
          }, () => {
            this.toggleEnablePaymentButton();
          })
        }else{
            this.setState({
              isFilledDni: false
            }, () => {
              this.toggleEnablePaymentButton();
            })
        }
      })
    }

    if(e.target.id === 'docTypeSelector'){
      this.setState({ 
        buyerDocType: e.target.value 
      }, () => {
        console.log(this.state.buyerDocType)
        if(this.state.buyerDocType.length > 0){
          this.setState({
            isFilledDoctype: true
          }, () => {
            this.toggleEnablePaymentButton();
          })
        }else{
            this.setState({
              isFilledDoctype: false
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

    /*axios.post('https://parseapi.back4app.com/classes/EventsLog', servicesSelected, axiosConfig)
         .then(res => {
             //console.log(res);
         })
         .catch(error => {
            //console.log(error);
         });*/

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

  confirmEnrollment(){
    ToastsStore.success("👍 Has confirmado exitosamente tu matrícula")
    this.setState({
      toggleConfirmModal : false,
      confirmAction : 'visible'
    })
  }

  // Props definitions
  static propTypes = {
    show : PropTypes.string
  }

  render() {
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
                              <h2 className="">Resumen total servicios seleccionados</h2>
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
                                      <td>Total Matrícula</td>
                                      <td><NumberFormat value={this.state.total_yearly_services} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr>
                                      <td>Total Mensualidades</td>
                                      <td><NumberFormat value={this.state.total_montly_services} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr>
                                      <td>Total Eco y Club deportivo</td>
                                      <td><NumberFormat value={this.state.total_eco_club_services} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr>
                                      <td><b>Total anual</b></td>
                                      <td><b><NumberFormat value={this.state.sub_total_annual} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                                    </tr>
                                    <tr className="bg-primary text-white py-3">
                                      <td><b>Forma de pago</b></td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Selecione una forma de pago</td>
                                      <td>
                                        <select className="form-control"
                                            id="paymentSelector"
                                            style={{ width: 'auto', display: 'inherit' }}
                                            onChange={this.handleOnChange}
                                            value={this.state.payment_selection}
                                            value={this.state.transport}>
                                                <option value="unico">Único pago (1)</option>
                                                <option value="dos">Dos pagos (2)</option>
                                                <option value="once">Once pagos (11)</option>
                                                {/* Cuando un padre seleccione un transporte seleccionará si desea tomar modalidad extracurricular */}
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Ahorro en las mensualidades</td>
                                      <td><NumberFormat value={this.state.bigTotalPaymentSavings} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr>
                                      <td><b>Total a pagar</b></td>
                                      <td><b><NumberFormat value={this.state.bigTotalPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                                    </tr>
                                    <tr className="bg-primary text-white py-3">
                                      <td><b>Confirmar matrícula</b></td>
                                      <td></td>
                                    </tr>
                                    <tr className="">
                                      <td><b>Antes de realizar el pago en línea y la impresión del pdf*</b><br/>Confirme que esta de acuerdo con los valores y servicios seleccionados</td>
                                      <td><Button color="primary" onClick={this.confirmModal}>Confirmar</Button></td>
                                      <Modal isOpen={this.state.toggleConfirmModal} toggle={this.confirmModal} className={this.props.className}>
                                          <ModalHeader toggle={this.confirmModal}>Confirmación de matrícula</ModalHeader>
                                          <ModalBody>
                                              <div className="alert alert-primary" role="alert">
                                                  Escriba <code><b><u>ACEPTO</u></b></code> para confirmar que esta de acuerdo con los servicios seleccionados, los totales y la forma de pago
                                              </div>
                                              <input type="text" class="form-control" id="text-confirm" onChange={this.handleOnChange}></input>
                                          </ModalBody>
                                          <ModalFooter>
                                            <Button color="secondary" onClick={this.confirmModal}>Cancelar</Button>
                                            <Button color="primary" disabled={this.state.confirmButtonDisabled} onClick={this.confirmEnrollment}>Confirmar</Button>
                                          </ModalFooter>
                                      </Modal>
                                    </tr>
                                    <tr className="bg-primary text-white py-3" style={{ visibility: this.state.confirmAction }}>
                                      <td><b>Pago en línea e impresión</b></td>
                                      <td></td>
                                    </tr>
                                    <tr className="" style={{ visibility: this.state.confirmAction }}>
                                      <td ><b>Imprimir Recibo de Matrícula</b><br/>Guarde el pdf generado y subalo a OpenApply</td>
                                      <td><Button color="primary" onClick={() => this.printPdf()}>Imprimir</Button></td>
                                      
                                      <Modal size="lg" isOpen={this.state.togglePdfViewer} toggle={this.printPdf} className={this.props.className}>
                                          <ModalHeader toggle={this.printPdf}>Confirmación de matrícula</ModalHeader>
                                          <ModalBody> 
                                                Pdf viewer
                                                  {/*<PdfViewer pdfBlob={'http://dgo.ujed.mx/doc/Carta_Laboral-DGO.pdf#toolbar=1'} />*/}
                                                  <PrintPage />
                                          </ModalBody>
                                          <ModalFooter>
                                            <Button color="secondary" onClick={this.printPdf}>Cancelar</Button>
                                          </ModalFooter>
                                      </Modal>

                                    </tr>
                                    <tr className="" style={{ visibility: this.state.confirmAction }}>
                                      <td ><b>Pagar el línea con TUCompra <u>sin costo adicional</u></b><br/>Ofrecemos la facilidad de pago en línea con TuCompra. Agíl, seguro y desde la comodidad de su casa.</td>
                                      <td><Button color="success" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Pagar en línea</Button>
                                      </td>
                                    </tr>
                                    {/*<tr>
                                        <td colSpan="2" id="base_table">
                                            <div className="alert alert-primary" role="alert">
                                              <p> <b>Pagar en banco (sin costo adicional):</b> Imprima su recibo y acerquese a la sucursal del <b>Banco de Bogotá</b> más cercana para realizar el pago. </p>
                                              <p> <b>Pagar en línea (con costo adicional):</b> Ofrecemos la facilidad de pago en línea con PayU. Agíl, seguro y desde la comodidad de su casa. (<a href="https://www.payulatam.com/co/tarifas/" rel="noopener noreferrer" target="_blank">Conoce las tarifas de PayU - 3.49% + $900</a>)</p>
                                            </div>
                                        </td>
                                    </tr>*/}
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
                                          hidden={true}
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
                                  <Modal isOpen={this.state.modal} size="lg" toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Resumen de pago en línea</ModalHeader>
                                    <ModalBody>
                                        <div id="wow" className="col-md-12">
                                            <h6 >Información del pagador</h6>
                                            <div id="little-text" class="alert alert-primary" role="alert">
                                                *Antes de continuar con el pago es importante que diligencie la información del pagador.
                                            </div>
                                        </div>
                                        <div className="form-row py-2">
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" value={this.state.buyerName} id="inputBuyerName" placeholder="Nombre(s)" />
                                          </div>
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" value={this.state.buyerLastName} id="inputBuyerLastName" placeholder="Apellidos" />
                                          </div>
                                        </div>
                                        <div className="form-row py-2">
                                          <div className="col">
                                              <select className="form-control"
                                                id="docTypeSelector"
                                                value={this.state.buyerDocType}
                                                style={{ width: '100%', display: 'inherit' }}
                                                onChange={this.handleOnChangeBuyer}>
                                                    <option value="CC">Cédula de Ciudadanía</option>
                                                    <option value="CE">Cédula de Extranjería</option>
                                                    <option value="PAS">Pasaporte</option>
                                                    <option value="NIT">NIT</option>
                                              </select>
                                          </div>
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" value={this.state.buyerDni} id="inputBuyerDni" placeholder="No. identificación" />
                                          </div>
                                        </div>
                                        <div className="form-row py-2">
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" value={this.state.buyerPhone} id="inputBuyerPhone" placeholder="No. Móvil" />
                                          </div>
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" value={this.state.buyerEmail} id="inputBuyerEmail" placeholder="Correo eletrónico" />
                                          </div>
                                        </div>
                                        <div className="form-row py-2">
                                          <div className="col">
                                              <input type="text" onChange={this.handleOnChangeBuyer} className="form-control" value={this.state.buyerAddress} id="inputBuyerAddress" placeholder="Dirección" />
                                          </div>
                                        </div>
                                        <div className="py-2">
                                          <h6 >Detalle del pago</h6>
                                          <div className="row">
                                            <div className="col-md-12">
                                              <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                      <td >Total a pagar</td>
                                                      <td><NumberFormat value={this.state.bigTotalPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
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
                                                      <input name="Submit" disabled={this.state.isPayButtonDisabled} hidden={true} type="submit"  value="Pagar con PayU" className="btn btn-success btn-lg" id="button_payu"></input>
                                                    </form>
                                                </div>
                                          </div>
                                          <div className="row">
                                                <div className="col-sm"></div>
                                                <div className="col-sm"></div>
                                                <div className="col-sm text-right">
                                                    {/*PayU form*/}
                                                    <form method="post" action="https://gateway2.tucompra.com.co/tc/app/inputs/compra.jsp" target="_blank">
                                                      <input name="usuario"             type="hidden" value={this.state.usuario} />
                                                      <input name="factura"             type="hidden" value={this.state.enrollment_token} />
                                                      <input name="valor"               type="hidden" value={this.state.bigTotalPayment} />
                                                      <input name="descripcionFactura"  type="hidden" value={this.getDescripcionFactura()} />
                                                      <input name="tokenSeguridad"      type="hidden" value={this.state.tokenSeguridad} />
                                                      <input name="tipoDocumento"       type="hidden" value={this.state.buyerDocType} />
                                                      <input name="documentoComprador"  type="hidden" value={this.state.buyerDni} />
                                                      <input name="nombreComprador"     type="hidden" value={this.state.buyerName} />
                                                      <input name="apellidoComprador"   type="hidden" value={this.state.buyerLastName} />
                                                      <input name="correoComprador"     type="hidden" value={this.state.buyerEmail} />
                                                      <input name="telefonoComprador"   type="hidden" value={this.state.buyerPhone} />
                                                      <input name="celularComprador"    type="hidden" value={this.state.buyerPhone} />
                                                      <input name="direccionComprador"  type="hidden" value={this.state.buyerAddress} />
                                                      <input name="campoExtra1"         type="hidden" value={this.getNowDate()} />

                                                      <input name="Submit" disabled={this.state.isPayButtonDisabled} type="submit" value="Pagar con TUCompra" className="btn btn-success" id="button_payu"></input>
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
            <ToastsContainer store={ToastsStore} timer={5000}/>
          </main>
          <Footer copyright="&copy;Colegio Rochester 2019" />
        </div>
    );
  }
}

export default Resume;