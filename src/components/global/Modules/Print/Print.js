// Dependencies
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

//Assets
import logo_black from '../../images/logo_black_2.jpg';
import './Print.css';
import Texts from '../../../../Utils/Texts'

class Print extends Component {
    constructor(props) {
        super(props);

        this.generateReference = this.generateReference.bind(this);
        this.pdfToHTML         = this.pdfToHTML.bind(this);
        this.pdfGenerator      = this.pdfGenerator.bind(this);

        this.state={
            token            : '',
            nombres          : '',
            apellidos        : '',
            grado            : '',
            codigo           : '',
            matricula        : 0,
            matricula_7_5    : 0,
            matricula_15     : 0,
            bibliobanco      : 0,
            matricula_tarifa : 0,
            solo_descuento   : 0,
            asopadres        : 0,
            anuario          : 0,
            seguro           : 0,
            club             : 0,
            pension          : 0,
            transporte       : 0,
            almuerzo         : 0,
            m9               : 0,
            desayuno         : 0,
            seguroVida       : 0,
            seguroDesempleo  : 0,

            // Total
            total            : 0,
            num_recibo       : '',
            fecha            : '',
            totalEcoServices : 0
        }
    }

    pdfToHTML(){
        /*html2canvas($('#hello-there'), { onrendered: function(canvas){
            var img = canvas.toDataURL("image/png")
            var pdf = new jsPDF('p', 'pt', 'letter');
            pdf.addImage(img, 'JPEG', 20, 20)
            pdf.save('html2pdf.pdf')
            }
        })*/
        

        //var pdf = new jsPDF('p', 'pt', 'letter');
        //var source = $('#hello-there')[0]; 
        //var specialElementHandlers = {
        //    '#bypassme': function(element, renderer) {
        //        return true
        //    } 
        //};
    
        //var margins = {
        //    top: 50,
        //    left: 60,
        //    width: 545
        //};

        
    
        /*pdf.fromHTML (
          source // HTML string or DOM elem ref.
          , margins.left // x coord
          , margins.top // y coord
          , {
              'width': margins.width // max width of content on PDF
              , 'elementHandlers': specialElementHandlers
            },
          function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF
            // this allow the insertion of new lines after html
            pdf.save('html2pdf.pdf');
          })*/
    }

    pdfGenerator(){
        let item = document.getElementById('hello-there')
        let opt = {
            margin: 2,
            filename: 'MAT-COMPROBANTE-2019-20.pdf',
            image : { type: 'jpeg', quality: 0.98 },
            html2canvas: {scale: 2}
        }
        //var worker = html2pdf().set(opt).from(item).toPdf().save()
    }

    componentDidMount(){
        var servicesObj = this.props.location.state
        console.log(servicesObj)

        console.log()

        let student_data = servicesObj.demographic
        let annual_data  = servicesObj.annual_services
        let montly_data  = servicesObj.montly_services
        let payments     = servicesObj.payments

        this.setState({
            // Student Data
            codigo           : student_data.codigo,
            nombres          : student_data.nombres + " " + student_data.apellidos,
            grado            : student_data.grado,
            token            : servicesObj.token,
            // services datatotal
            matricula_tarifa : annual_data[0].total,
            matricula_dto    : annual_data[0].discount,
            bibliobanco      : annual_data[1].total,
            seguro           : annual_data[2].total,
            anuario          : annual_data[3].total,
            asopadres        : annual_data[4].total,
            club             : annual_data[5].total,
            pension          : Number(montly_data[0].total * 10),
            pension_dto      : Number(montly_data[0].discount),
            transporte       : Number(montly_data[1].total * 10),
            almuerzo         : Number(montly_data[2].total * 10),
            m9               : Number(montly_data[3].total * 10),
            desayuno         : Number(montly_data[4].total * 10),
            seguroVida       : Number(montly_data[5].total * 10),
            seguroDesempleo  : Number(montly_data[6].total * 10),
            // Payments values
            totalEcoServices : Number(payments[2].eco_total_pay * 10),
            tot_servicios    : "XX",
            total            : "XX",
            solo_descuento   : "XX"
        }, () => {
            //console.log("================>"+ this.state.solo_descuento);
            this.generateReference();
            this.setState({ 
                total : this.state.matricula_tarifa + 
                        this.state.bibliobanco + 
                        this.state.seguro +
                        this.state.anuario + 
                        this.state.asopadres +
                        this.state.club + 
                        this.state.pension + 
                        this.state.transporte + 
                        this.state.almuerzo + 
                        this.state.m9 + 
                       // this.state.desayuno + 
                        this.state.seguroVida + 
                        this.state.seguroDesempleo +
                        this.state.totalEcoServices })
        });      
    }

    generateReference = () => {
        var now   = new Date();
        var day   = now.getDate();
        var year  = now.getFullYear();
        var month = now.getMonth()+1;
        const today = year + "/" + month + "/" + day;

        console.log(today);

        const reference = "MAT201819-";
        this.setState({
            num_recibo : reference + this.state.codigo,
            fecha : today
        }, () => {
            setTimeout(function() {
            window.print();
            }, 2000)
        })
    }

    render() {
        return (
        <div className="Print">
            <main id="hello-there">
                <div className="album py-5" >
                    <div className="container">
                        <div className="row">
                            <div id="divToPrint">
                                <table style={{width: '100%'}}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table style={{width: '100%'}}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{width: '17.5866%'}} rowSpan="3">
                                                                <p><img src={logo_black} className="Print-logo" alt="" /></p>
                                                                <p>&nbsp;</p>
                                                            </td>
                                                            <td style={{width: '80.6162%', textAlign: 'center'}}>
                                                                <h4>FUNDACION EDUCATIVA ROCHESTER</h4>
                                                                <h5>NIT: 900 509 589 - 7</h5>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '80.6162%', textAlign: 'center'}}>
                                                                <p style={{fontSize: 'small'}}>FACTURA ANUAL DE SERVICIOS CONTRATADOS 2019-2020
                                                                <br />Actividad comercial 8512. Tarifa I.C.A 0.4%.
                                                                <br />Responsables ICA Municipio de Chía, Cundinamarca
                                                                <br />NO RESPONSABLE DE I.V.A&nbsp;</p></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <h5><strong>Informaci&oacute;n del Alumno</strong></h5>
                                                <table style={{width: '100%'}}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{width: '20%'}}><strong><p className="general-text">Token:</p></strong></td>
                                                            <td style={{width: '80%'}}><p className="general-text"><span id="token">{this.state.token}</span></p></td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '20%'}}><strong><p className="general-text">Fecha:</p></strong></td>
                                                            <td style={{width: '80%'}}><p className="general-text">{this.state.fecha}</p></td>                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '20%'}}><strong><p className="general-text">Alumno:</p></strong></td>
                                                            <td style={{width: '80%'}}><p className="general-text">{this.state.nombres} {this.state.apellidos}</p></td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '20%'}}><strong><p className="general-text">C&oacute;digo:</p></strong></td>
                                                            <td style={{width: '80%'}}><p className="general-text">{this.state.codigo}</p></td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '20%'}}><strong><p className="general-text">Grado:</p></strong></td>
                                                            <td style={{width: '80%'}}><p className="general-text">{this.state.grado}</p></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <hr />
                                                <table className="table table-sm table-striped table-bordered" style={{width: '100%'}}>
                                                    <tbody>
                                                        <tr className="table-active">
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><strong><p className="general-text">Concepto</p></strong></td>
                                                            <td style={{width: '23.7908%'}}><strong><p className="general-text">Becas</p></strong></td>
                                                            <td style={{width: '21%', textAlign: 'right'}}><strong><p className="general-text">Valor a pagar</p></strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Derecho de matrícula</p></td>
                                                            <td style={{width: '23.7908%'}}><NumberFormat value={this.state.matricula_dto} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                    <NumberFormat value={this.state.matricula_tarifa} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Bibliobanco</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                    <NumberFormat value={this.state.bibliobanco} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Afiliaci&oacute;n Asopadres</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                    <NumberFormat value={this.state.asopadres} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Anuario</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                    <NumberFormat value={this.state.anuario} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Seguro de accidentes</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.seguro} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Afiliación Club Deportivo</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.club} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Pensión (x10 meses)</p></td>
                                                            <td style={{width: '23.7908%'}}><NumberFormat value={this.state.pension_dto} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.pension} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Almuerzo (x10 meses)</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.almuerzo} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Medias nueves (x10 meses)</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.m9} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        {/*<tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Desayuno (x10 meses)</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.desayuno} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>*/}
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Seguro de vida (x10 meses)</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.seguroVida} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Seguro de desempleo (x10 meses)</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.seguroDesempleo} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Extracurricular (x10 meses)</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                <NumberFormat value={this.state.totalEcoServices} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text"><strong>TOTAL A PAGAR</strong></p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                    <strong><NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></strong>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <hr />
                                                <p style={{fontSize: '1.07rem !important', textAlign: 'justify'}}>{Texts.general_texts[0].footer_text}</p>
                                                <br />
                                                <br />
                                                <table style={{width: '100%'}}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{width: '45%'}}>
                                                                <hr className="hr-custom"/>
                                                                <p className="signs-text"><strong>Padre</strong><br />
                                                                <strong><input type="checkbox" name="" id=""/>C.C &emsp;<input type="checkbox" name="" id=""/>P.S &emsp;<input type="checkbox" name="" id=""/>C.E </strong><br />
                                                                <strong>No.</strong>
                                                                </p>
                                                            </td>
                                                            <td style={{width: '10%'}}></td>
                                                            <td style={{width: '45%'}}>
                                                                <hr className="hr-custom"/>
                                                                <p className="signs-text"><strong>Madre</strong><br />
                                                                <strong><input type="checkbox" name="" id=""/>C.C &emsp;<input type="checkbox" name="" id=""/>P.S &emsp;<input type="checkbox" name="" id=""/>C.E </strong><br />
                                                                <strong>No.</strong>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '45%'}}>
                                                                <br />
                                                                <hr className="hr-custom"/>
                                                                <p className="signs-text"><strong>Acudiente</strong><br />
                                                                <strong>
                                                                    <input type="checkbox" name="" id=""/>C.C &emsp;<input type="checkbox" name="" id=""/>P.S &emsp;<input type="checkbox" name="" id=""/>C.E  
                                                                </strong><br />
                                                                <strong>No.</strong>
                                                                </p>
                                                            </td>
                                                            <td style={{width: '10%'}}></td>
                                                            <td style={{width: '45%'}}></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        );
    }
}

export default Print;