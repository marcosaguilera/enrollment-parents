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
import Demographic from '../Demographic/Demographic'
import ServiceTbale from '../ServiceTable/ServiceTable'

//// Functions
import Utils from '../../../../Utils/Utils.js'
import Texts from '../../../../Utils/Texts'

class Services extends Component {

  constructor(props){
    super(props);

    this.handleGetTotals           = this.handleGetTotals.bind(this);
    this.handleGetTotalToPay       = this.handleGetTotalToPay.bind(this);
    this.handleClickSearchStudent  = this.handleClickSearchStudent.bind(this);
    this.handleOnChange            = this.handleOnChange.bind(this);
    this.handleOnChangeServices    = this.handleOnChangeServices.bind(this);
    this.handleSaveServices        = this.handleSaveServices.bind(this);
    this.getOpenApplyUuid          = this.getOpenApplyUuid.bind(this);
    this.getOpenApplyUuid          = this.getOpenApplyUuid.bind(this);

    this.state = {
        count                                : 0,
        resultState                          : 0,
        objectId                             : '',
        createdAt                            : '',
        updatedAt                            : '',
        codigo                               : '',
        nombres                              : '',
        apellidos                            : '',
        tarifa_plena                         : 0,
        bibliobanco                          : 0,
        tarifa_reducida_7_5                  : 0,
        tarifa_reducida_15                   : 0,
        descuento_exalumno                   : 0,
        descuento_2do_hno                    : 0,
        descuento_3er_hno                    : 0,
        descuento_4to_hno                    : 0,
        empleado                             : 0,
        santa_barbara                        : 0,
        convenio                             : 0,
        otros                                : 0,
        grado                                : '',
        student_code                         : '',

        // Servicios de matrículas
        seguro_accidentes                    : 56000,
        anuario_impreso                      : 116000,
        anuario_digital                      : 48000,
        anuario_combo                        : 158000,
        asopadres                            : 180000,
        club                                 : 400000,

        // zero values,
        seguro_cero                          : 0,
        anuario_cero                         : 0,
        asopadres_cero                       : 0,
        club_cero                            : 0,

        // Seleccionado
        seguro_seleccionado                  : 0,
        anuario_seleccionado                 : 0,
        asopadres_seleccionado               : 0,
        club_seleccionado                    : 0,
        anuarioName                          : '',

        // Total a pagar state
        total_tarifas_mat                    : 0,
        total_matricula                      : 0,
        total_solo_descuentos                : 0,
        total_conceptos_matricula_descuentos : 0,
        total_dtos_matr                      : 0,
        total_servicios                      : 0,
        total_pagar                          : 0,
        total_selecciones                    : 0,

        // Addons states
        loading                              : false,  // will be true when ajax request is running
        isOpen                               : false,  // Modal windows state
        isOpenLoader                         : false,  // Modal windows state
        isDisableSelect                      : true,
        isShowingResume                      : 'none',

        // Modal message
        message                              : '',

        // Data PropTypes to Resume
        resumeData                           : 0,

        // Labels
        label_seguro                         : 'Si - $56.000',
        label_seguro_cero                    : 'No - $0.0',
        label_anuario_impreso                : 'Impreso - $116.000',
        label_anuario_digital                : 'Digital - $48.000',
        label_anuario_combo                  : 'Impreso y digital - $158.000',
        label_anuario_cero                   : 'No - $0.0',
        label_asopadres                      : 'Si - $180.000',
        label_asopadres_cero                 : 'No - $0.0',
        label_club                           : 'Si - $400.000',
        label_club_cero                      : 'No - $0.0',

        // OpenApply data
        studentCode: '', openApplyId: 0, customId: '',
        enrollment_year: '', first_name: '', last_name: '', gender: '', grade: '', name_full: '',
        serial_number: 0, student_id: '',

        token:'', financial:'', metodo_pago_definido: '', pago_anticipado: ''
    }
  } 

  componentDidMount(){
      this.setState({
        seguro_seleccionado    : this.state.seguro_accidentes,
        anuario_seleccionado   : this.state.anuario_impreso,
        asopadres_seleccionado : this.state.asopadres,
        club_seleccionado      : this.state.club
      }, () => {
        this.handleGetTotalToPay("fromStart")
      });
  }

  handleClickSearchStudent(){
    if(this.state.student_code.length === 5 ){
        this.toggleModalLoader();

        let student_code = this.state.student_code;
        this.getOpenApplyUuid(student_code);
    }else{
        //this.loaderStatusChange();
        this.toggleModalWrongCode(); // If the code size is not equals to 5, then show a message
    }
  }

  getOpenApplyUuid(std_code){
    const url = "https://rcis-backend.herokuapp.com/openapply/student/getopenapplybystudentcode/" + std_code;
    axios.get(url)
        .then( res => {

          let demo_data = res.data[0];
          //console.log("==> data: " + JSON.stringify(demo_data))
          let fake_text = 'rayos!!!!'

          store.dispatch(
            {
              type: "SAVE_STUDENT_ESSENTIAL_DATA",
              fake_text,
              demo_data
            },
          )

          this.setState({
              openApplyId       : demo_data.id,
              customId          : demo_data.custom_id,
              enrollment_year   : demo_data.enrollment_year,
              gender            : demo_data.gender,
              first_name        : demo_data.first_name,
              last_name         : demo_data.last_name,
              name_full         : demo_data.name,
              serial_number     : demo_data.serial_number,
              student_id        : demo_data.student_id
          }, () => {
              //console.log("=>" + this.state.openApplyId)
              this.getEnrolmentAuth(this.state.openApplyId)
          })

        })
  }

  getEnrolmentAuth(std_openapply_uid){
    const url = "https://rcis-backend.herokuapp.com/enrollment/authorization/" + std_openapply_uid;
    axios.get(url)
        .then(res =>{
          console.log("----> autorizaciones")
          console.log(res.data)
          let isAuth = this.authChecker(res.data.financial) && this.authChecker(res.data.metodo_pago_definido)
          console.log("isAuthorized: " + isAuth);
          
          store.dispatch({
            type: "SAVE_STUDENT_AUTHORIZATION",
            isAuth
          })

          this.setState({
            token : res.data.token,
            financial: res.data.financial,
            metodo_pago_definido: res.data.metodo_pago_definido,
            pago_anticipado: res.data.pago_anticipado
          })

          if(isAuth){
            axios.get('https://rcis-backend.herokuapp.com/student/yearlyservices/' + this.state.student_code)
                  .then(res => {

                    let item = res.data[0];
                    let jsonLenght = Object.keys(item).length;

                    if(jsonLenght > 0){
                        //After checked json elemento is comming with data
                        store.dispatch({
                          type: "SAVE_SERVICE_DATA",
                          service_data : item
                        })

                        //Setting Parse Data to states
                        this.setState({
                            objectId                             : item.objectId,
                            createdAt                            : item.createdAt,
                            updatedAt                            : item.updatedAt,
                            codigo                               : item.Codigo,
                            nombres                              : item.Nombres,
                            apellidos                            : item.Apellidos,
                            grado                                : item.Grado,
                            tarifa_plena                         : Number(item.Derecho_Matricula_Plena),
                            tarifa_reducida_7_5                  : Number(item.Derecho_por_pago_anualidades_7_5),
                            tarifa_reducida_15                   : Number(item.Derecho_por_pago_anualidades_15),
                            bibliobanco                          : Number(item.Bibliobanco),
                            descuento_exalumno                   : Number(item.Hijo_Exalumno),
                            descuento_2do_hno                    : Number(item.Hijo_2),
                            descuento_3er_hno                    : Number(item.Hijo_3),
                            descuento_4to_hno                    : Number(item.Hijo_4),
                            empleado                             : Number(item.Empleado),
                            santa_barbara                        : Number(item.SantaBarbara),
                            convenio                             : Number(item.Jardin_Convenio),
                            otros                                : Number(item.Otros),
                            total_conceptos_matricula_descuentos : Number(item.total_conceptos_matricula_descuentos),
                            total_solo_descuentos                : Number(item.total_conceptos_descuentos),
                            total_matricula                      : Number(item.total_conceptos_matricula),
                            total_dtos_matr                      : Number(item.total_conceptos_descuentos),

                        }, () => {
                          this.setState({
                            matricula_nombre : Utils.getMatriculaName(this.state.tarifa_plena, this.state.tarifa_reducida_7_5, this.state.tarifa_reducida_15),
                            anuarioName : Utils.getAnuarioName(this.state.anuario_seleccionado)
                          })
                        });
                        this.handleGetTotals();
                        this.toggleSelectorsActivation();
                        this.loaderStatusChange();
                    }else{
                      this.loaderStatusChange();
                      this.toggleModalNoResults();
                    }
                })
          }else if(!this.authChecker(res.data.financial)) {
              this.toggleModalLoader()
              this.setState({
                isOpen: !this.state.isOpen,
                message: Texts.general_texts[0].no_financial_auth
              })
          }else if(!this.authChecker(res.data.metodo_pago_definido)) {
            this.toggleModalLoader()
            this.setState({
              isOpen: !this.state.isOpen,
              message: Texts.general_texts[0].no_davivienda_payment
            })
          }else{
            this.toggleModalLoader()
            this.setState({
              isOpen: !this.state.isOpen,
              message: Texts.general_texts[0].no_financial_auth + "<br /><br />" +  Texts.general_texts[0].no_davivienda_payment 
            })
          }
        })
  }

  authChecker(authData){
    return authData === "Si" ? true : false
  }

  handleGetTotals(){
    this.setState({
      // Sumamos las tarifas y restamos los descuentos
      total_conceptos_matricula_descuentos: Number( (this.state.tarifa_plena
                                + this.state.tarifa_reducida_7_5
                                + this.state.tarifa_reducida_15
                                + this.state.bibliobanco )
                                -
                                  (this.state.descuento_exalumno
                                + this.state.descuento_2do_hno
                                + this.state.descuento_3er_hno
                                + this.state.descuento_4to_hno
                                + this.state.empleado
                                + this.state.santa_barbara
                                + this.state.convenio
                                + this.state.otros)
                              ),

      total_solo_descuentos:  Number( this.state.descuento_exalumno
                                    + this.state.descuento_2do_hno
                                    + this.state.descuento_3er_hno
                                    + this.state.descuento_4to_hno
                                    + this.state.empleado
                                    + this.state.santa_barbara
                                    + this.state.convenio
                                    + this.state.otros
                                  ),

      total_matricula: Number(this.state.tarifa_plena
                            + this.state.tarifa_reducida_7_5
                            + this.state.tarifa_reducida_15
                            + this.state.bibliobanco ),
      
      total_tarifas_mat: Number(this.state.tarifa_plena
                            + this.state.tarifa_reducida_7_5
                            + this.state.tarifa_reducida_15),

      total_dtos_matr: Number(this.state.descuento_exalumno
                            + this.state.descuento_2do_hno
                            + this.state.descuento_3er_hno
                            + this.state.descuento_4to_hno
                            + this.state.empleado
                            + this.state.santa_barbara
                            + this.state.convenio
                            + this.state.otros),

      total_servicios: Number(this.state.seguro_accidentes +
                              this.state.anuario_impreso +
                              this.state.asopadres +
                              this.state.club )
    });

    console.log("===> Total for discounts: " + this.state.total_conceptos_matricula_descuentos );
    console.log("===> Total matricula: " + this.state.total_matricula );
    console.log("===> Total dtos: " + this.state.total_dtos_matr );
    console.log("===> Total for services: " + this.state.total_servicios );
    console.log("===> Total only discounts: " + this.state.total_solo_descuentos );
    // Calling the method for totalize
    this.handleGetTotalToPay("fromSearch");
  }

  handleOnChange(e){
    if(e.target.id === 'student_code_input'){
      this.setState({ student_code: String(e.target.value) });
    }
  }

  handleOnChangeServices(e){
    if(e.target.id === 'seguro-accidentes'){
          console.log("Seguro: " + e.target.value)
          this.setState({
              seguro_seleccionado: Number(e.target.value)
          }, () => {
              //console.log("Seguro updated: " + this.state.seguro_seleccionado);
              this.handleGetTotalToPay("fromSelection");
          })
    }

    if(e.target.id === 'anuario'){
          this.setState({
              anuario_seleccionado: Number(e.target.value)
          }, () => {
              this.handleGetTotalToPay("fromSelection")
              this.setState({ anuarioName : Utils.getAnuarioName(this.state.anuario_seleccionado) })
          })
    }

    if(e.target.id === 'asopadres'){
          console.log("Asopadres: " + e.target.value)
          this.setState({
              asopadres_seleccionado: Number(e.target.value)
          }, () => {
              //console.log("Asopadres updated: " + this.state.asopadres_seleccionado);
              this.handleGetTotalToPay("fromSelection");
          })
    }

    if(e.target.id === 'afiliacion-club'){
        console.log("Club: " + e.target.value);
        this.setState({
            club_seleccionado: Number(e.target.value)
        }, () => {
            //console.log("Club: " + this.state.club_seleccionado);
            this.handleGetTotalToPay("fromSelection");
        })
    }
  }

  handleGetTotalToPay(action){
      switch(action) {
        case "fromSearch":
            this.setState({
              total_pagar : Number(this.state.total_conceptos_matricula_descuentos + this.state.total_servicios),
              total_selecciones: Number(this.state.seguro_seleccionado
                                  + this.state.anuario_seleccionado
                                  + this.state.asopadres_seleccionado
                                  + this.state.club_seleccionado)
            })
            break;
        case "fromSelection":
            this.setState({
              total_pagar : Number( this.state.total_conceptos_matricula_descuentos
                                  + this.state.seguro_seleccionado
                                  + this.state.anuario_seleccionado
                                  + this.state.asopadres_seleccionado
                                  + this.state.club_seleccionado ),
              total_selecciones: Number(this.state.seguro_seleccionado
                                  + this.state.anuario_seleccionado
                                  + this.state.asopadres_seleccionado
                                  + this.state.club_seleccionado)
            })
            break;
        case "fromStart":
            this.setState({
              total_pagar : Number( this.state.total_conceptos_matricula_descuentos
                                  + this.state.seguro_seleccionado
                                  + this.state.anuario_seleccionado
                                  + this.state.asopadres_seleccionado
                                  + this.state.club_seleccionado ),
              total_selecciones: Number(this.state.seguro_seleccionado
                                  + this.state.anuario_seleccionado
                                  + this.state.asopadres_seleccionado
                                  + this.state.club_seleccionado)
            })
            break;

        default:
            console.log("Default action coming: " + action);
      }
  }

  toggleModal = () => {
      this.setState({
        isOpen: !this.state.isOpen,
      });
  }

  toggleModalNoResults = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      message: 'No se encontraron resultados para el código ingresado. Verifique el código del estudiante e intente nuevamente.'
    });
  }

  toggleModalWrongCode = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      message: 'El código del estudiante debe tener una extensión de 5 dígitos. Por favor verifiquelo e intente nuevamente.'
    });
  }

  toggleModalLoader = () => {
    this.setState({
      isOpenLoader: !this.state.isOpenLoader
    });
  }

  loaderStatusChange = () => {
    setTimeout(()=> this.setState({isOpenLoader: false}), 0)
  }

  toggleSelectorsActivation = () =>{
    this.setState({
      isDisableSelect: false
    });
  }

  nextPath = () => {
    let data_step1       = { token:'', financialAuth:'', paymentMethod: '', anticipatedPayment: '', demographic:{}, annual_services: [], montly_services:[], eco:[], payments:[], payments_form:[], people_eco:[] }
    let demographic_data = {}
    let annual_services  = []
    let enrollment       = {}
    let bookSeries       = {}
    let accidentalSecure = {}
    let annuaryBook      = {}
    let asopadres        = {}
    let sportsClub       = {}
    let totals_annual    = {}

    // Student data
    demographic_data.codigo    = this.state.codigo
    demographic_data.nombres   = this.state.nombres
    demographic_data.apellidos = this.state.apellidos
    demographic_data.grado     = this.state.grado
    demographic_data.uid       = this.state.openApplyId

    //////SERIALIZNG SELECTIONS///////
    /// MATRICULA
    enrollment.type           = 'Anual'
    enrollment.name           = this.state.matricula_nombre
    enrollment.code           = Utils.getServiceCode(this.state.matricula_nombre)
    enrollment.select         = 'Si'
    enrollment.value          = this.state.total_tarifas_mat
    enrollment.discount       = this.state.total_solo_descuentos
    enrollment.total          = Number(this.state.total_tarifas_mat - this.state.total_solo_descuentos)
    /// BIBLIOBANCO
    bookSeries.type           = 'Anual'
    bookSeries.name           = 'Bibliobanco'
    bookSeries.code           = Utils.getServiceCode('Bibliobanco')
    bookSeries.select         = 'Si'
    bookSeries.value          = this.state.bibliobanco
    bookSeries.discount       = 0
    bookSeries.total          = this.state.bibliobanco
    /// SEGURO ACCIDENTES
    accidentalSecure.type     = 'Anual'
    accidentalSecure.name     = 'Seguro accidentes'
    accidentalSecure.code     = Utils.getServiceCode('Seguro accidentes')
    accidentalSecure.select   = Utils.checkSelection(this.state.seguro_seleccionado)
    accidentalSecure.value    = this.state.seguro_seleccionado
    accidentalSecure.discount = 0
    accidentalSecure.total    = this.state.seguro_seleccionado
    /// ANUARIO
    annuaryBook.type          = 'Anual'
    annuaryBook.name          = this.state.anuarioName
    annuaryBook.code          = Utils.getServiceCode(this.state.anuarioName)
    annuaryBook.select        = Utils.checkSelection(this.state.anuario_seleccionado)
    annuaryBook.value         = this.state.anuario_seleccionado
    annuaryBook.discount      = 0
    annuaryBook.total         = this.state.anuario_seleccionado
    /// ASOPADRES
    asopadres.type            = 'Anual'
    asopadres.name            = 'Asopadres'
    asopadres.code            = Utils.getServiceCode('Asopadres')
    asopadres.select          = Utils.checkSelection(this.state.asopadres_seleccionado)
    asopadres.value           = this.state.asopadres_seleccionado
    asopadres.discount        = 0
    asopadres.total           = this.state.asopadres_seleccionado
    /// CLUB DEPORTIVO
    sportsClub.type           = 'Anual'
    sportsClub.name           = 'Club deportivo'
    sportsClub.code           = Utils.getServiceCode('Club deportivo')
    sportsClub.select         = Utils.checkSelection(this.state.club_seleccionado)
    sportsClub.value          = this.state.club_seleccionado
    sportsClub.discount       = 0
    sportsClub.total          = this.state.club_seleccionado

    annual_services.push(enrollment)
    annual_services.push(bookSeries)
    annual_services.push(accidentalSecure)
    annual_services.push(annuaryBook)
    annual_services.push(asopadres)
    annual_services.push(sportsClub)

    console.log("===> Total enrollment + bookstore: " + this.state.total_matricula );
    console.log("===> Total only discounts: " + this.state.total_solo_descuentos );
    console.log("===> Total selected services: " + this.state.total_selecciones );
    console.log("===> Total (enrollment + bookstore) - discounts: " + this.state.total_conceptos_matricula_descuentos );

    totals_annual.annual_total_enrollment_bookstore      = this.state.total_matricula
    totals_annual.annual_total_discounts                 = this.state.total_solo_descuentos
    totals_annual.annual_total_enrollment_with_discounts = this.state.total_conceptos_matricula_descuentos
    totals_annual.annual_total_seleted_services          = this.state.total_selecciones
    totals_annual.annual_total_to_pay                    = this.state.total_pagar

    // Populating object
    data_step1['token']              = this.state.token
    data_step1['financial']          = this.state.financial
    data_step1['paymentMethod']      = this.state.metodo_pago_definido
    data_step1['anticipatedPayment'] = this.state.pago_anticipado
    data_step1['demographic']        = demographic_data
    data_step1['annual_services']    = annual_services
    data_step1['payments'].push(totals_annual)

    this.setState({
      isShowingResume: ''
    });

    console.log("Final data Step 1: ");
    console.log(data_step1)
    this.props.history.push('/enrolment_montly_services', data_step1)
  }

  handleSaveServices(){
    var servicesSelected                 = {};
    var data                             = {};

    data.codigo                          = this.state.codigo;
    data.bibliobanco                     = this.state.bibliobanco;
    data.matricula                       = this.state.tarifa_plena;
    data.total_matricula                 = this.state.total_matricula;
    data.total_dto_matricula             = this.state.total_dtos_matr;
    data.total_descuentos                = this.state.total_descuentos;
    data.total_servicios                 = this.state.total_servicios;
    data.total_pagar                     = this.state.total_pagar;
    data.anuario                         = this.state.anuario_seleccionado;
    data.seguro_accidentes               = this.state.seguro_seleccionado;
    data.asopadres                       = this.state.asopadres_seleccionado;
    data.afiliacion_club                 = this.state.club_seleccionado;
    // Log Object
    servicesSelected.action              = "Service Selection";
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

  render() {
    return (
      <div className="bg-light">
        {/*<Header />*/}

        <main role="main"  className="container" id="customStyle">
          <div className="shadow-sm p-3 mb-5 bg-white rounded">
            <div className="starter-template">

              <p id="help-text" className="lead">Ingrese el código del estudiante</p>

              <div className="row">
                  <div className="col-sm"></div>
                  <div className="col-sm">
                    <div className="input-group input-group-lg mb-3">
                        <input
                          id="student_code_input"
                          onChange={ this.handleOnChange }
                          type="text"
                          className="form-control"
                          placeholder="Código"
                          aria-describedby="basic-addon2"
                          maxLength="5">
                        </input>
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary"
                            id="Popover1"
                            onClick={this.handleClickSearchStudent}
                            type="button"> Buscar </button>
                        </div>
                    </div>
                  </div>
                  <div className="col-sm"></div>
              </div>
            </div>

            <hr />

            <Demographic 
                name={this.state.nombres} 
                lastname={this.state.apellidos} 
                code={this.state.codigo} 
                grade={this.state.grado} />

            <hr />

            <div className="p-3 mb-5 bg-white rounded">
              <div className="row">

                <div className="col-md-8">
                  <ServiceTbale />
                </div>

                <div className="col-md-4">
                  <div className="card">
                      <div className="card-header bg-primary" style={{ padding: '.95rem 1.25rem' }}>
                        <h6 id="card_title_color" className="mb-0 text-center">Servicios adicionales</h6>
                      </div>

                      {/*<ul className="list-group list-group-flush">
                        <li className="list-group-item" id="line_color">
                            <div>
                                <h5 className="mb-0 text-center">
                                    <NumberFormat value={this.state.total_descuentos} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </h5>
                            </div>
                        </li>
                        <li className="list-group-item"><br /></li>
                        <li className="list-group-item bg-primary">
                            <h6 id="card_title_color" className="mb-0 text-center">Servicios adicionales</h6>
                        </li>
                      </ul>*/}

                      <div className="card-body">
                          <p className="" >Seleccione los servicios que desea adicionar:</p>
                          {/*Select Seguro Accidentes*/}
                          <div className="row">
                              <div className="col-md-12 mb-3" >
                                <label htmlFor="country">Seguro de accidentes</label>
                                <select className="custom-select d-block w-100" 
                                        onChange={this.handleOnChangeServices} 
                                        id="seguro-accidentes" 
                                        disabled={this.state.isDisableSelect}>
                                          <option value={this.state.seguro_accidentes} defaultValue="selected">{this.state.label_seguro}</option>
                                          <option value={this.state.seguro_cero}>{this.state.label_seguro_cero}</option>
                                </select>
                              </div>
                          </div>
                          {/*Select Anuario*/}
                          <div className="row">
                              <div className="col-md-12 mb-3" >
                                <label htmlFor="country">Anuario</label>
                                <select className="custom-select d-block w-100" 
                                        onChange={this.handleOnChangeServices} 
                                        id="anuario"
                                        disabled={this.state.isDisableSelect}>
                                          <option value={this.state.anuario_impreso} defaultValue="selected">{this.state.label_anuario_impreso}</option>
                                          <option value={this.state.anuario_digital}>{this.state.label_anuario_digital}</option>
                                          {/*<option value={this.state.anuario_combo}>{this.state.label_anuario_combo}</option>*/}
                                          <option value={this.state.anuario_cero}>{this.state.label_anuario_cero}</option>
                                </select>
                              </div>
                          </div>
                          {/*Select Asopadres*/}
                          <div className="row">
                              <div className="col-md-12 mb-3" >
                                <label htmlFor="country">Asopadres</label>
                                <select className="custom-select d-block w-100" 
                                        onChange={this.handleOnChangeServices} 
                                        id="asopadres"
                                        disabled={this.state.isDisableSelect}>
                                          <option value={this.state.asopadres} defaultValue="selected">{this.state.label_asopadres}</option>
                                          <option value={this.state.asopadres_cero}>{this.state.label_asopadres_cero}</option>
                                </select>
                              </div>
                          </div>
                          {/*Select Afiliación Club Deportivo*/}
                          <div className="row">
                              <div className="col-md-12 mb-3" >
                                <label htmlFor="country">Afiliación Club Deportivo<br /> <b>(solo estudiantes de 5º a 11º)</b></label>
                                <select className="custom-select d-block w-100" 
                                        onChange={this.handleOnChangeServices} 
                                        id="afiliacion-club"
                                        disabled={this.state.isDisableSelect}>
                                          <option value={this.state.club} defaultValue="selected">{this.state.label_club}</option>
                                          <option value={this.state.club_cero}>{this.state.label_club_cero}</option>
                                </select>
                              </div>
                          </div>
                      </div>

                      <div className="card-footer bg-success text-white">
                        <div className="row">
                          <div className="col-12">
                            <center><h5>Total a pagar</h5></center>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                              <center>
                                <h5>
                                  <NumberFormat value={this.state.total_pagar} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </h5>
                              </center>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">

                            {/*Modal for no results from cloud data*/}
                            <ModalUI title="Important message" 
                                      show={this.state.isOpen} 
                                      onClose={this.toggleModalNoResults} 
                                      msn={this.state.message}>
                            </ModalUI>

                            {/*Modal for Wrong code inserted*/}
                            <ModalUI2 title="Important message" 
                                      show={this.state.isOpen} 
                                      onClose={this.toggleModalWrongCode} 
                                      msn={this.state.message}>
                            </ModalUI2>

                            {/*Modal for Loading...*/}
                            <LoadingModal title="Cargando datos. Espere ..." 
                                          show={this.state.isOpenLoader} 
                                          onClose={this.toggleModalLoader} >
                            </LoadingModal>

                          </div>
                        </div>
                      </div>

                  </div>
                  <br/ >
                  <div className="row">
                    <div className="col-12">
                      <button type="button"
                              className="btn btn-primary btn-lg btn-block"
                              onClick={() => this.nextPath()}
                              disabled={this.state.isDisableSelect}>Siguiente</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </main>

        <Footer copyright="&copy; Colegio Rochester " />

      </div>
    );
  }
}

export default Services;