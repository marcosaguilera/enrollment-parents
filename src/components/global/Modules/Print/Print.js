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
        <div id="divToPrint">
          <div>Note: Here the dimensions of div are same as A4</div> 
          <div>You Can add any component here</div>
        </div>
      </div>
    );
  }
}

export default Print;