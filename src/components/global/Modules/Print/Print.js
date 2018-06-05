// Dependencies
import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

//Assets
import logo_black from '../../images/logo_black_2.jpg';
import './Print.css';

class Print extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      const now   = new Date()
      console.log(now);
      setTimeout(function() {
        window.print();
      }, 2000)
      //this.printDocument(now);
  }

  printDocument(inDatum) {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
          const ctx = canvas.getContext('2d');
                ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;

          const imgData = canvas.toDataURL('image/jpeg,1.0');
          const pdf = new jsPDF();

          pdf.addImage(imgData, 'JPEG', 0, 0);
          pdf.save(inDatum + ".pdf");
      });
  }

  render() {
    return (
      <div className="Print">
        <main>  
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
                                                            <p style={{fontSize: 'small'}}>RECIBO DE PAGO EN BANCOS N&ordm;. xxxxxxxxxx
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
                                                        <td style={{width: '80.7766%'}}><p className="general-text">2018/03/01</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '16.2234%'}}><strong><p className="general-text">Alumno:</p></strong></td>
                                                        <td style={{width: '80.7766%'}}><p className="general-text">Marcos Antonio Aguilera Ely</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '16.2234%'}}><strong><p className="general-text">C&oacute;digo:</p></strong></td>
                                                        <td style={{width: '80.7766%'}}><p className="general-text">05012</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '16.2234%'}}><strong><p className="general-text">Grado:</p></strong></td>
                                                        <td style={{width: '80.7766%'}}><p className="general-text">D&eacute;cimo</p></td>
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
                                                        <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Matr&iacute;cula</p></td>
                                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                        <td style={{width: '21%', textAlign: 'right'}}><p className="general-text">$1.352.221</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Bibliobanco</p></td>
                                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                        <td style={{width: '21%', textAlign: 'right'}}><p className="general-text">$850.000</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Afiliaci&oacute;n asopadres</p></td>
                                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                        <td style={{width: '21%', textAlign: 'right'}}><p className="general-text">$158.000</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Anuario</p></td>
                                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                        <td style={{width: '21%', textAlign: 'right'}}><p className="general-text">$89.000</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text">Seguro de accidentes</p></td>
                                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                        <td style={{width: '21%', textAlign: 'right'}}><p className="general-text">$55.000</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '50.2092%', textAlign: 'left'}}><p className="general-text"><strong>TOTAL A PAGAR</strong></p></td>
                                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                                        <td style={{width: '21%', textAlign: 'right'}}><p className="general-text"><strong>$2.504.221</strong></p></td>
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