import React, { Component } from 'react';

//// Other dependencies
import axios from 'axios';
import NumberFormat from 'react-number-format';

//// Addons
import LoadingModal from '../../Addons/LoadSpinner';
import ModalUI from '../../Addons/Modal';
import ModalUI2 from '../../Addons/Modal';

//////// Assets
import '../../Modules/Services/Services.css';

//Components declaration
import Header from '../../Header'
import Footer from '../../Footer'

class Services extends Component {
//////// Controller

  constructor(props){
    super(props);

    this.handleGetTotals           = this.handleGetTotals.bind(this);
    this.handleGetTotalToPay       = this.handleGetTotalToPay.bind(this);
    this.handleClickSearchStudent  = this.handleClickSearchStudent.bind(this);
    this.handleOnChange            = this.handleOnChange.bind(this);
    this.handleOnChangeServices    = this.handleOnChangeServices.bind(this);
    this.handleSaveServices        = this.handleSaveServices.bind(this);

    this.state = {
        count                 : 0,
        resultState           : 0,
        objectId              : '',
        createdAt             : '',
        updatedAt             : '',
        codigo                : '',
        nombres               : '',
        apellidos             : '',
        tarifa_plena          : 0,
        bibliobanco           : 0,
        tarifa_reducida_7_5   : 0,
        tarifa_reducida_15    : 0,
        descuento_exalumno    : 0,
        descuento_2do_hno     : 0,
        descuento_3er_hno     : 0,
        descuento_4to_hno     : 0,
        empleado              : 0,
        santa_barbara         : 0,
        convenio              : 0,
        otros                 : 0,
        grado                 : '',
        student_code          : '',

        // Servicios de matrículas
        seguro_accidentes     : 55000,
        anuario_impreso       : 110000,
        anuario_digital       : 46000,
        anuario_combo         : 156000,
        asopadres             : 172000,
        club                  : 375000,
        
        // zero values,
        seguro_cero           : 0,
        anuario_cero          : 0,
        asopadres_cero        : 0,
        club_cero             : 0,
        
        // Seleccionado
        seguro_seleccionado   : 0,
        anuario_seleccionado  : 0,
        asopadres_seleccionado: 0,
        club_seleccionado     : 0,

        // Total a pagar state
        total_matricula       : 0,
        total_dtos_matr       : 0,
        total_descuentos      : 0,
        total_servicios       : 0,
        total_pagar           : 0,

        // Addons states
        loading               : false, // will be true when ajax request is running
        isOpen                : false,  // Modal windows state
        isOpenLoader          : false,  // Modal windows state
        isDisableSelect       : true, 
        isShowingResume       : 'none',
        popoverOpen           : true,  

        // Modal message
        message               : '',
        
        // Data PropTypes to Resume
        resumeData            : 0,

        // Labels
        label_seguro          : 'Si - $55.000',
        label_seguro_cero     : 'No - $0.0',
        label_anuario_impreso : 'Impreso - $110.000',
        label_anuario_digital : 'Digital - $46.000',
        label_anuario_combo   : 'Impreso y digital - $156.000',
        label_anuario_cero    : 'No - $0.0',
        label_asopadres       : 'Si - $172.000',
        label_asopadres_cero  : 'No - $0.0',
        label_club            : 'Si - $375.000',
        label_club_cero       : 'No - $0.0'
    }
  }

  componentDidMount(){

      this.setState({
          seguro_seleccionado: this.state.seguro_accidentes,
          anuario_seleccionado: this.state.anuario_impreso,
          asopadres_seleccionado: this.state.asopadres,
          club_seleccionado: this.state.club

      }, () => {
        /*console.log("didMount action: " + this.state.seguro_seleccionado + ", " 
                                        + this.state.anuario_seleccionado + ", " 
                                        + this.state.asopadres_seleccionado + ", " 
      + this.state.club_seleccionado);*/
        this.handleGetTotalToPay("fromStart");
      });
  }

  handleClickSearchStudent(){

    let axiosConfig = {
      headers: {
          'X-Parse-Application-Id': 'U8jcs4wAuoOvBeCUCy4tAQTApcfUjiGmso98wM9h',
          'X-Parse-Master-Key': 'vN7hMK7QknCPf2xeazTaILtaskHFAveqnh6NDwi6',
          'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    let studentCodeSize = this.state.student_code.length;
    console.log("Student code size: " + studentCodeSize);

    if(studentCodeSize === 5 ){
        this.toggleModalLoader(); 
        
        //axios.get('https://parseapi.back4app.com/classes/Enrollment?where={"CODIGO":"' + this.state.student_code + '"}', axiosConfig)
        axios.get('https://parseapi.back4app.com/classes/EnrollmentData?where={"Codigo":"' + this.state.student_code + '"}', axiosConfig)
          .then(res => {
            console.log("Full object:");
            console.log(res.data);
            console.log("Node object:");
            console.log(res.data.results);
            console.log("Item object:");
            let item = res.data.results[0];
            
            // jsonLenght gets the number of objects in the response
            let jsonLenght = Object.keys(res.data.results).length;
            console.log("Response size:" + jsonLenght);
            console.log(item);

            if(jsonLenght > 0){ 
                //Setting Parse Data to states
                this.setState({
                    objectId:            item.objectId, 
                    createdAt:           item.createdAt,
                    updatedAt:           item.updatedAt,
                    codigo:              item.Codigo,
                    nombres:             item.Nombres,
                    apellidos:           item.Apellidos,
                    grado:               item.Grado,
                    tarifa_plena:        Number(item.Derecho_Matricula_Plena),
                    bibliobanco:         Number(item.Bibliobanco),
                    tarifa_reducida_7_5: Number(item.Derecho_por_pago_anualidades_7_5),
                    tarifa_reducida_15:  Number(item.Derecho_por_pago_anualidades_15),
                    descuento_exalumno:  Number(item.Hijo_Exalumno),
                    descuento_2do_hno:   Number(item.Hijo_2),
                    descuento_3er_hno:   Number(item.Hijo_3),
                    descuento_4to_hno:   Number(item.Hijo_4),
                    empleado:            Number(item.Empleado),
                    santa_barbara:       Number(item.SantaBarbara),
                    convenio:            Number(item.Jardin_Convenio),
                    otros:               Number(item.Otros)
                });
                this.handleGetTotals();
                this.toggleSelectorsActivation();
                this.loaderStatusChange();
            }else{
              this.loaderStatusChange();
              this.toggleModalNoResults();
            }
        })
    }else{
        //this.loaderStatusChange();
        this.toggleModalWrongCode(); // If the code size is not equals to 5, then show a message
    }       
  }

  handleGetTotals(){
    this.setState({
      // Sumamos las tarifas y restamos los descuentos
      total_descuentos: Number( (this.state.tarifa_plena
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

      total_matricula: Number(this.state.tarifa_plena
                            + this.state.tarifa_reducida_7_5
                            + this.state.tarifa_reducida_15
                            + this.state.bibliobanco ),

      total_dtos_matr: Number(this.state.descuento_exalumno
                            + this.state.descuento_2do_hno
                            + this.state.descuento_3er_hno
                            + this.state.descuento_4to_hno
                            + this.state.empleado
                            + this.state.santa_barbara
                            + this.state.convenio
                            + this.state.otros),
                            
      // Sumamos el total de servicios seleccionados
      total_servicios: Number(this.state.seguro_accidentes + 
                              this.state.anuario_impreso +
                              this.state.asopadres +
                              this.state.club )
    });               

    console.log("===> Total for discounts: " + this.state.total_descuentos );
    console.log("===> Total matricula: " + this.state.total_matricula );
    console.log("===> Total dtos: " + this.state.total_dtos_matr );
    console.log("===> Total for services: " + this.state.total_servicios );
    // Calling the method for totalize
    this.handleGetTotalToPay("fromSearch");
  }

  handleOnChange(e){
    if(e.target.id === 'student_code_input'){
      this.setState({
        student_code: String(e.target.value)
      }, () => {
        console.log("=> code: " + this.state.student_code)
      });
    }
  }

  handleOnChangeServices(e){
     
    if(e.target.id === 'seguro-accidentes'){
        console.log("Seguro: " + e.target.value); 
        this.setState({
            seguro_seleccionado: Number(e.target.value)
        }, () => {
            console.log("Seguro updated: " + this.state.seguro_seleccionado);
            this.handleGetTotalToPay("fromSelection");
        })     
     }
     
     if(e.target.id === 'anuario'){
        console.log("Anuario: " + e.target.value); 
        this.setState({
            anuario_seleccionado: Number(e.target.value)
        }, () => {
            console.log("Anuario updated: " + this.state.anuario_seleccionado);
            this.handleGetTotalToPay("fromSelection");
        })
     }
     
     if(e.target.id === 'asopadres'){
        console.log("Asopadres: " + e.target.value); 
        this.setState({
            asopadres_seleccionado: Number(e.target.value)
        }, () => {
          console.log("Asopadres updated: " + this.state.asopadres_seleccionado);
          this.handleGetTotalToPay("fromSelection");
        })
     }
     
     if(e.target.id === 'afiliacion-club'){
        console.log("Club: " + e.target.value);
        this.setState({
            club_seleccionado: Number(e.target.value)
        }, () => {
          console.log("Club: " + this.state.club_seleccionado);
          this.handleGetTotalToPay("fromSelection");
        })
     }

  }
  
  handleGetTotalToPay(action){
      switch(action) {
        case "fromSearch":
            this.setState({
              total_pagar : Number(this.state.total_descuentos + this.state.total_servicios)
            })
            break;
        case "fromSelection":
            this.setState({
              total_pagar : Number( this.state.total_descuentos 
                                  + this.state.seguro_seleccionado
                                  + this.state.anuario_seleccionado
                                  + this.state.asopadres_seleccionado
                                  + this.state.club_seleccionado )
            })
            break;
        case "fromStart":
            this.setState({
              total_pagar : Number( this.state.total_descuentos 
                                  + this.state.seguro_seleccionado
                                  + this.state.anuario_seleccionado
                                  + this.state.asopadres_seleccionado
                                  + this.state.club_seleccionado )
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

  loaderStatusChange = () =>{

    setTimeout(()=> this.setState({isOpenLoader: false}), 0)

  }

  toggleSelectorsActivation = () =>{

    this.setState({
      isDisableSelect: false
    });

  }

  nextPath = () => {
    var services              = new Object();
    services.seguro           = this.state.seguro_seleccionado;
    services.anuario          = this.state.anuario_seleccionado;
    services.asopadres        = this.state.asopadres_seleccionado;
    services.bibliobanco      = this.state.bibliobanco;
    services.club             = this.state.club_seleccionado;
    services.total_descuentos = this.state.total_descuentos;
    services.total_servicios  = this.state.total_servicios;
    services.total_pagar      = this.state.total_pagar;
    // Student data
    services.codigo           = this.state.codigo;
    services.nombres          = this.state.nombres;
    services.apellidos        = this.state.apellidos;
    services.grado            = this.state.grado;
    services.uid              = this.state.objectId;

    this.setState({
      isShowingResume: ''
    });

    this.props.history.push('/resume', services);
    this.handleSaveServices();
  }

  handleSaveServices(){
    var servicesSelected                 = new Object();
    var data                             = new Object();

    // Data Object
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
  
  /////////////////////////////////
  //////// Rendering UI ///////////
  /////////////////////////////////

  render() {
    return (
      <div className="bg-light">
        <Header />

        <main role="main"  className="container">
          <div className="shadow-sm p-3 mb-5 bg-white rounded">
            <div className="starter-template">
              
              <p id="help-text" className="lead">Ingrese el código del estudiante</p>

              <div className="row">
                  <div className="col-sm"></div>
                  <div className="col-sm">
                    <div className="input-group input-group-lg mb-3">
                        <input
                          id="student_code_input"
                          onChange={this.handleOnChange}
                          type="text" 
                          className="form-control" 
                          placeholder=""
                          aria-label="Recipient's username" 
                          aria-describedby="basic-addon2"
                          maxLength="5">
                        </input>
                        <div className="input-group-append">
                          <button 
                            className="btn btn-primary"
                            id="Popover1"
                            onClick={this.handleClickSearchStudent}
                            type="button">Buscar</button> 
                        </div>
                    </div>
                  </div>
                  <div className="col-sm"></div>
              </div>
              
            </div>

            <hr />

            <div className="row">
                  <div className="col-md-12">
                      <h4 className="d-flex justify-content-between mb-3" >Información del Estudiante</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Código</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" value={this.state.codigo} required="" readOnly="readonly"></input>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Grado</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" value={this.state.grado} required="" readOnly="readonly"></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Nombres</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" value={this.state.nombres} required="" readOnly="readonly"></input>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Apellidos</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" value={this.state.apellidos} required="" readOnly="readonly"></input>
                      </div>
                    </div>

                  </div>
                  
            </div>

            <hr />

            <div className="shadow-sm p-3 mb-5 bg-white rounded">
              <div className="row">

                <div className="col-md-8">
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
                        <td>Derecho de Matrícula Pleno</td>
                        <td></td>
                        <td><NumberFormat value={this.state.tarifa_plena} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Bibliobanco</td>
                        <td></td>
                        <td><NumberFormat value={this.state.bibliobanco} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Derecho de Matrícula -7.5% por pago de anualidades futuras</td>
                        <td></td>
                        <td><NumberFormat value={this.state.tarifa_reducida_7_5} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      </tr>
                      <tr>
                        <td>Derecho de Matrícula -15% por pago de anualidades futuras</td>
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

                <div className="col-md-4">
                  <div className="card">
                      <div className="card-header bg-primary" >
                        <h6 id="card_title_color" className="mb-0 text-center">Total Matrículas + Bibliobanco</h6>
                      </div>

                      <ul className="list-group list-group-flush">
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
                      </ul>
                      
                      <div className="card-body">
                          <p className="" >A continuación seleccione los servicios que desea adicionar:</p>
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
                                          <option value={this.state.anuario_combo}>{this.state.label_anuario_combo}</option>
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
                                <label htmlFor="country">Afiliación Club Deportivo</label>
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
                              disabled={this.state.isDisableSelect}>Imprimir y Pagar</button>
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

export default Services;