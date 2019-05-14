// Dependencies
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import jsPDF from 'jspdf';
import $ from 'jquery'
import html2canvas from 'html2canvas'

//Assets
import logo_black from '../../images/logo_black_2.jpg';
import './Print.css';

class Print extends Component {
    constructor(props) {
        super(props);

        this.generateReference = this.generateReference.bind(this);
        this.pdfToHTML         = this.pdfToHTML.bind(this);

        this.state={
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
            total            : 0,
            num_recibo       : '',
            fecha            : ''
        }
    }

    pdfToHTML(){
        html2canvas(document.getElementById('#hello-there'))
        var img = html2canvas.toDataURL("image/png")

        var pdf = new jsPDF('p', 'pt', 'letter');
        var source = $('#hello-there')[0]; 
        var specialElementHandlers = {
            '#bypassme': function(element, renderer) {
                return true
            } 
        };
    
        var margins = {
            top: 50,
            left: 60,
            width: 545
        };

        pdf.addImage(img, 'JPEG', 20, 20)
        pdf.save('html2pdf.pdf')
    
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

    componentDidMount(){
        //var servicesObj = this.props.location.state;
        //console.log("Services data: " + JSON.stringify(servicesObj));

        this.setState({
            // Student Data
            codigo           : "XX",
            nombres          : "XX",
            apellidos        : "XX",
            grado            : "XX",
            objectId         : "XX",
            // services data
            bibliobanco      : "XX",
            matricula_tarifa : "XX",
            matricula_15     : "XX",
            matricula_7_5    : "XX",
            anuario          : "XX",
            asopadres        : "XX",
            club             : "XX",
            seguro           : "XX",
            tot_servicios    : "XX",
            total            : "XX",
            solo_descuento   : "XX"
            // Student Data
            /*codigo           : servicesObj.codigo,
            nombres          : servicesObj.nombres,
            apellidos        : servicesObj.apellidos,
            grado            : servicesObj.grado,
            objectId         : servicesObj.uid,
            // services data
            bibliobanco      : servicesObj.bibliobanco,
            matricula_tarifa : servicesObj.tarifa_matricula,
            matricula_15     : servicesObj.matricula_15,
            matricula_7_5    : servicesObj.matricula_7_5,
            anuario          : servicesObj.anuario,
            asopadres        : servicesObj.asopadres,
            club             : servicesObj.club,
            seguro           : servicesObj.seguro,
            tot_servicios    : servicesObj.total_servicios,
            total            : servicesObj.total_pagar,
            solo_descuento   : servicesObj.total_solo_dtos*/

        }, () => {
            //console.log("================>"+ this.state.solo_descuento);
            this.generateReference();
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
            //setTimeout(function() {
            //window.print();
            //}, 2000)
        })
    }

    render() {
        return (
        <div className="Print">
            <button onClick={this.pdfToHTML}>Download PDF</button><br />

            <div id="hello-there">
                <table style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <td style={{width: '50%'}}><img src={logo_black} alt="" width="176" height="164" /></td>
                            <td style={{width: '50%'}}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{width: '100%'}} colSpan="2">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            


            {/*<main id="hello-there">  
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
                                                                <p style={{fontSize: 'small'}}>RECIBO DE PAGO EN BANCOS N&ordm;. {this.state.num_recibo}
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
                                                            <td style={{width: '16.2234%'}}><strong><p className="general-text">Fecha:</p></strong></td>
                                                            <td style={{width: '80.7766%'}}><p className="general-text">{this.state.fecha}</p></td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '16.2234%'}}><strong><p className="general-text">Alumno:</p></strong></td>
                                                            <td style={{width: '80.7766%'}}><p className="general-text">{this.state.nombres} {this.state.apellidos}</p></td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '16.2234%'}}><strong><p className="general-text">C&oacute;digo:</p></strong></td>
                                                            <td style={{width: '80.7766%'}}><p className="general-text">{this.state.codigo}</p></td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '16.2234%'}}><strong><p className="general-text">Grado:</p></strong></td>
                                                            <td style={{width: '80.7766%'}}><p className="general-text">{this.state.grado}</p></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <hr />
                                                <table className="table table-sm table-striped table-bordered" style={{width: '100%'}}>
                                                    <tbody>
                                                        <tr className="table-active">
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><strong><p className="general-text">Concepto</p></strong></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}><strong><p className="general-text">Valor a pagar</p></strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Matrícula</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                    <NumberFormat value={this.state.matricula_tarifa + this.state.matricula_15 + this.state.matricula_7_5} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Descuento</p></td>
                                                            <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                            <td style={{width: '21%', textAlign: 'right'}}>
                                                                <p className="general-text">
                                                                    -<NumberFormat value={this.state.solo_descuento} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Afiliaci&oacute;n asopadres</p></td>
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
                                                <p style={{fontSize: '1.07rem !important', textAlign: 'justify'}}>Nota: Si el estudiante, una vez matriculado en el COLEGIO ROCHESTER se retira antes de la fecha de iniciaci&oacute;n de clases del a&ntilde;o escolar 2018-2019, se le devolver&aacute; el 50% del valor de la matr&iacute;cula y el valor de los otros costos pagados. Si el estudiante se retira despu&eacute;s de iniciadas las clases, no habr&aacute; lugar a devolver suma alguna del valor de la matr&iacute;cula, y se le devolver&aacute; lo pagado por otros conceptos de costos proporcionalmente al tiempo de permanencia en EL COLEGIO.</p>
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
        </main>*/} 
        </div>
        );
    }
}

export default Print;