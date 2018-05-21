// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Resume extends Component {
  
  constructor(){
    super();
  }

  // Props definitions
  static propTypes = {
    data     : PropTypes.string,
    show     : PropTypes.string
  }

  render() {
    console.log(this.props)

    if(this.props.show === 'none') {
      return null;
    }

    console.log(this.props.show)
    
    
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
                                    <td>Mark</td>
                                    <td>Otto</td>
                                  </tr>
                                  <tr>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                  </tr>
                                  <tr>
                                    <td>Larry</td>
                                    <td>the Bird</td>
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