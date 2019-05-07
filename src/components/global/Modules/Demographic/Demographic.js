import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Demographic.css'

class Demographic extends Component {
    storeRedux = null;

    static propTypes = {
      name     : PropTypes.string.isRequired,
      lastname : PropTypes.string.isRequired,
      code     : PropTypes.string.isRequired,
      grade    : PropTypes.string.isRequired
    }

    constructor() {
        super();
        this.state = {
            demo_data         : [],
            hello_fake        : '',
            student_code      : '',
            student_grade     : '',
            student_name      : '',
            student_lastname  : ''
        };
    }

    componentDidMount(){
      //console.log("Demographic component DidMount")
      /*this.storeRedux = store.subscribe(() => {
          this.setState({
            hello_fake       : store.getState().fake_text,
            demo_data        : store.getState().demo_data,
            student_code     : store.getState().demo_data.custom_id,
            student_grade    : store.getState().demo_data.grade,
            student_name     : store.getState().demo_data.first_name,
            student_lastname : store.getState().demo_data.last_name,
          }, () => {
            //console.log("DEMO DATA: " + JSON.stringify(this.state.demo_data))
          })
      })*/
    }

    componentWillReceiveProps(){
        //console.log("Demographic component WillReceiveProps")
        this.setState({
            student_code     : this.props.code,
            student_grade    : this.props.grade,
            student_name     : this.props.name,
            student_lastname : this.props.lastname,
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                  <div className="col-md-12">
                      <h4 className="d-flex justify-content-between mb-3" >Información del estudiante</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                        <label className="customLabel" htmlFor="firstName">Código</label>
                        <input type="text" className="onlyReadInput" id="Code" value={this.state.student_code} readOnly="readonly"></input>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="customLabel" htmlFor="firstName">Grado</label>
                        <input type="text" className="onlyReadInput" id="Grade" value={this.state.student_grade} readOnly="readonly"></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="customLabel" htmlFor="firstName">Nombres</label>
                        <input type="text" className="onlyReadInput" id="firstName" value={this.state.student_name} readOnly="readonly"></input>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="customLabel" htmlFor="lastName">Apellidos</label>
                        <input type="text" className="onlyReadInput" id="lastName" value={this.state.student_lastname} readOnly="readonly"></input>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default Demographic;