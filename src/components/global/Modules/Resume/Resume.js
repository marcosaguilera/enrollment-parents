// Dependencies
import React, { Component } from 'react';

class Resume extends Component {
  render() {
    return (
      <div className="Resume">
        <main>  
          <div className="album py-5 bg-light" >
            <div className="container">
              <div className="row">
                <div className="col-md-2"> </div>
                <div className="col-md-8">
                  <div className="card p-5 bg-light text-dark">
                    <div className="card-body">
                      <div class="row">
                        <div class="col-md-12">
                            <h1 class="">Resumen de servicios</h1>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
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
        </main>   
      </div>
    );
  }
}

export default Resume;