// Dependencies
import React, { Component } from 'react';
import PDFDocument from 'pdfkit';

class Print extends Component {
  
  constructor(){
    super(); 
  }

  
  render() {   
    return (
      <div className="Print">
        Hello print!
      </div>
    );
  }
}

export default Print;