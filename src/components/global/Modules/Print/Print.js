// Dependencies
import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

//Assets
import './Print.css';

class Print extends Component {
  constructor(props) {
    super(props);

   
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();

          pdf.addImage(imgData, 'JPEG', 0, 0);
          
          // pdf.output('dataurlnewwindow');
          pdf.save("download.pdf");
      });
  }

  

  render() {
    return (
      <div className="Print">
        <div className="mb5">
            <button onClick={this.printDocument}>Print</button>
        </div>
        <div id="divToPrint" 
             style={{ background: '#f5f5f5', 
                      width: '210mm',
                      minHeight: '297mm',
                      paddingLeft: '80px',
                      paddingTop: '20px',
                      paddingBottom: '20px',
                      paddingRight: '140px',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                   }}>

        <table style={{width: '100%'}}>
                <tbody>
                    <tr>
                        <td>
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <td style={{width: '17.5866%'}} rowSpan="3">
                                            <p><img src="http://losmejorescolegios.com/images/colegios/colegio-rochester/logo-colegio-rochester-chia.jpg" alt="" width="176" height="164" /></p>
                                            <p>&nbsp;</p>
                                        </td>
                                        <td style={{width: '80.6162%', textAlign: 'center'}}>
                                            <h5>FUNDACION EDUCATIVA ROCHESTER</h5>
                                            <h6>NIT: 900 509 589 - 7</h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '80.6162%', textAlign: 'right'}}>
                                            <p style={{fontSize: 'xx-small'}}>RECIBO DE PAGO EN BANCOS N&ordm;. xxxxxxxxxx
                                            <br />Actividad comercial 8000. Tarifa I.C.A 0.7%.
                                            <br />NO RESPONSABLE DE I.V.A&nbsp;</p></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                            <h5><strong>Informaci&oacute;n del Alumno</strong></h5>
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <td style={{width: '16.2234%'}}><strong>Fecha:</strong></td>
                                        <td style={{width: '80.7766%'}}>2018/03/01</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '16.2234%'}}><strong>Alumno:</strong></td>
                                        <td style={{width: '80.7766%'}}>Marcos Antonio Aguilera Ely</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '16.2234%'}}><strong>C&oacute;digo:</strong></td>
                                        <td style={{width: '80.7766%'}}>05012</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '16.2234%'}}><strong>Grado:</strong></td>
                                        <td style={{width: '80.7766%'}}>D&eacute;cimo</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <td style={{width: '50.2092%', textAlign: 'left'}}><strong>Concepto</strong></td>
                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                        <td style={{width: '21%', textAlign: 'right'}}><strong>Valor a pagar</strong></td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '50.2092%', textAlign: 'left'}}>Matr&iacute;cula</td>
                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                        <td style={{width: '21%', textAlign: 'right'}}>$1.352.221</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '50.2092%', textAlign: 'left'}}>Bibliobanco</td>
                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                        <td style={{width: '21%', textAlign: 'right'}}>$850.000</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '50.2092%', textAlign: 'left'}}>Afiliaci&oacute;n asopadres</td>
                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                        <td style={{width: '21%', textAlign: 'right'}}>$158.000</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '50.2092%', textAlign: 'left'}}>Anuario</td>
                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                        <td style={{width: '21%', textAlign: 'right'}}>$89.000</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '50.2092%', textAlign: 'left'}}>Seguro de accidentes</td>
                                        <td style={{width: '23.7908%'}}>&nbsp;</td>
                                        <td style={{width: '21%', textAlign: 'right'}}>$55.000</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '50.2092%', textAlign: 'left'}}>&nbsp;</td>
                                        <td style={{width: '23.7908%'}}><strong>TOTAL A PAGAR</strong></td>
                                        <td style={{width: '21%', textAlign: 'right'}}><strong>$2.504.221</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <p style={{fontSize: '11px', textAlign: 'justify'}}>Nota: Si el estudiante, una vez matriculado en el COLEGIO ROCHESTER se retira antes de la fecha de iniciaci&oacute;n de clases del a&ntilde;o escolar 2018-2019, se le devolver&aacute; el 50% del valor de la matr&iacute;cula y el valor de los otros costos pagados. Si el estudiante se retira despu&eacute;s de iniciadas las clases, no habr&aacute; lugar a devolver suma alguna del valor de la matr&iacute;cula, y se le devolver&aacute; lo pagado por otros conceptos de costos proporcionalmente al tiempo de permanencia en EL COLEGIO.</p>
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <td style={{width: '45%'}}>&nbsp;
                                            <hr />
                                            <p style={{fontSize: '12px'}}><strong>Padre</strong><br />
                                              <strong>C.C__ P.S__ C.E__ </strong><br />
                                              <strong>No.__________________________________________</strong>
                                            </p>
                                        </td>
                                        <td style={{width: '10%'}}>&nbsp;</td>
                                        <td style={{width: '45%'}}>&nbsp;
                                            <hr />
                                            <p style={{fontSize: '12px'}}><strong>Madre</strong><br />
                                              <strong>C.C__ P.S__ C.E__ </strong><br />
                                              <strong>No.__________________________________________</strong>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '45%'}}>&nbsp;
                                            <hr />
                                            <p style={{fontSize: '12px'}}><strong>Acudiente</strong><br />
                                              <strong>C.C__ P.S__ C.E__ </strong><br />
                                              <strong>No.__________________________________________</strong>
                                            </p>
                                        </td>
                                        <td style={{width: '10%'}}>&nbsp;</td>
                                        <td style={{width: '45%'}}>&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>
    );
  }
}

export default Print;