import React, { Component } from 'react';
import store from '../../../../ReduxStore/store'

class DemographicInfo extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            student_demographic_data : []
        };

        store.subscribe(() => {
            this.setState({
                student_demographic_data : store.getState().essential_data
            })
        })
    }

    componentWillReceiveProps(){
        console.log(student_demographic_data)
    }
    
    render() {
        return (
            <div>
                <div className="row">
                  <div className="col-md-12">
                      <h4 className="d-flex justify-content-between mb-3" >Información del estudiante</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Código</label>
                        <input type="text" className="form-control onlyReadInput" id="Code" value={this.state.codigo} readOnly="readonly"></input>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Grado</label>
                        <input type="text" className="form-control onlyReadInput" id="Grade" value={this.state.grado} readOnly="readonly"></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Nombres</label>
                        <input type="text" className="form-control onlyReadInput" id="firstName" value={this.state.nombres} readOnly="readonly"></input>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Apellidos</label>
                        <input type="text" className="form-control onlyReadInput" id="lastName" value={this.state.apellidos} readOnly="readonly"></input>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default DemographicInfo;