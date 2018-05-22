// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Resume extends Component {
  
  constructor(){
    super();
  }

  // Props definitions
  static propTypes = {
    dataResumed : PropTypes.string.isRequired,
    show        : PropTypes.string
  }

  render() {
    console.log(this.props)

    if(this.props.show === 'none') {
      return null;
    }    
    
    return (
      <div className="Resume" style={{display: this.props.show }}>
        <main>  
          <div className="album py-5 bg-light" >
            <div className="container">
              <div className="row">
                <div className="col-md-2"> </div>
                <div className="col-md-8">
                  <div className="card p-5 bg-light text-dark">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                            <h1 className="">Resumen de servicios</h1>
                        </div>
                      </div>
                      <div className="py-5">
                          <div className="row">
                            <div className="col-md-12">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Concepto</th>
                                    <th>Valor ($)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Matrícula</td>
                                    <td>$ 1.345.000</td>
                                  </tr>
                                  <tr>
                                    <td>Seguro Accidentes</td>
                                    <td>$ 450.0000</td>
                                  </tr>
                                  <tr>
                                    <td>Anuario</td>
                                    <td>$ 0</td>
                                  </tr>
                                  <tr>
                                    <td>Asopadres</td>
                                    <td>$ 0</td>
                                  </tr>
                                  <tr>
                                    <td>Club</td>
                                    <td>$ 0</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>   
      </div>
    );
  }
}

export default Resume;