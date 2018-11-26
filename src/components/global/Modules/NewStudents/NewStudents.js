// Dependencies
import React, { Component } from 'react';
//import PropType from 'prop-types';

/// UI Elements
import { Container, Row, Col, CustomInput,
         Button, Jumbotron, FormGroup, Label, Input, Table } from 'reactstrap';

/// Components
//import NewStudents from '../../Header';

/// Assets
import './NewStudents.css';

class NewStudents extends Component {
    constructor(){
        super();

        this.handleInputChange = this.handleInputChange.bind(this);

        this.state={
            base_rates: [],
            grade: '', student_code: '', name: '', last_name: '', schoolar_year:'',
            annual_payments: '', parent_alumni: '', siblings: '', sta_barbara_alumni: '', allied_school: '', roch_employee: '', prepaid: '',

            //// Show/Hide Question elements
            q1_show: 'none',
            q3_show: 'none',
            q6_show: 'none',
            q7_show: 'none',
        }
    }

    handleInputChange(e){
        {/* Code OnChange setState value */}
        if(e.target.id === 'code'){
            this.setState({ student_code: String(e.target.value)
            }, () => {
              console.log("=> code: " + this.state.student_code)
            });
        }
        {/* Name OnChange setState value */}
        if(e.target.id === 'first_name'){
            this.setState({ name: String(e.target.value)
            }, () => {
              console.log("=> first_name: " + this.state.name)
            });
        }
        {/* Lastname OnChange setState value */}
        if(e.target.id === 'last_name'){
            this.setState({ last_name: String(e.target.value)
            }, () => {
              console.log("=> last name: " + this.state.last_name)
            });
        }
        {/* School year OnChange setState value */}
        if(e.target.id === 'sy'){
            this.setState({ schoolar_year: String(e.target.value)
            }, () => {
              console.log("=> sy: " + this.state.schoolar_year)
            });
        }
        {/* Grade OnChange setState value */}
        if(e.target.id === 'grade'){
            this.setState({
                grade: String(e.target.value)
            }, () => {
              console.log("=> grade: " + this.state.grade)
            });
        }
        {/* Q1 OnChange setState value */}
        if(e.target.id === 'annual_payments_yes'){
            this.setState({ annual_payments: e.target.value, q1_show: 'initial'
            }, () => {
              console.log("=> annual_payments_yes: " + this.state.annual_payments)
            });
        }
        if(e.target.id === 'annual_payments_no'){
            this.setState({ annual_payments: e.target.value, q1_show: 'none'
            }, () => {
              console.log("=> annual_payments_no: " + this.state.annual_payments)
            });
        }
        {/* Q2 OnChange setState value */}
        if(e.target.id === 'alumni_yes'){
            this.setState({
                parent_alumni: e.target.value
            }, () => {
              console.log("=> parent_alumni_yes: " + this.state.parent_alumni)
            });
        }
        if(e.target.id === 'alumni_no'){
            this.setState({
                parent_alumni: e.target.value
            }, () => {
              console.log("=> parent_alumni_yes: " + this.state.parent_alumni)
            });
        }
        {/* Q3 OnChange setState value */}
        if(e.target.id === 'siblings_yes'){
            this.setState({ siblings: e.target.value, q3_show: 'initial'
            }, () => {
              console.log("=> siblings_yes: " + this.state.siblings)
            });
        }
        if(e.target.id === 'siblings_no'){
            this.setState({ siblings: e.target.value, q3_show: 'none'
            }, () => {
              console.log("=> siblings_no: " + this.state.siblings)
            });
        }
        {/* Q4 OnChange setState value */}
        if(e.target.id === 'sta_barbara_alumni_yes'){
            this.setState({ sta_barbara_alumni: e.target.value
            }, () => {
              console.log("=> sta_barbara_alumni_yes: " + this.state.sta_barbara_alumni)
            });
        }
        if(e.target.id === 'sta_barbara_alumni_no'){
            this.setState({ sta_barbara_alumni: e.target.value
            }, () => {
              console.log("=> alumni_yes: " + this.state.sta_barbara_alumni)
            });
        }
        {/* Q5 OnChange setState value */}
        if(e.target.id === 'allied_school_yes'){
            this.setState({ allied_school: e.target.value
            }, () => {
              console.log("=> allied_school_yes: " + this.state.allied_school)
            });
        }
        if(e.target.id === 'allied_school_no'){
            this.setState({ allied_school: e.target.value
            }, () => {
              console.log("=> allied_school_no: " + this.state.allied_school)
            });
        }
        {/* Q6 OnChange setState value */}
        if(e.target.id === 'roch_employee_yes'){
            this.setState({ roch_employee: e.target.value, q6_show: 'initial'
            }, () => {
              console.log("=> roch_employee_yes: " + this.state.roch_employee)
            });
        }
        if(e.target.id === 'roch_employee_no'){
            this.setState({ roch_employee: e.target.value, q6_show: 'none'
            }, () => {
              console.log("=> roch_employee_no: " + this.state.roch_employee)
            });
        }
        {/* Q7 OnChange setState value */}
        if(e.target.id === 'prepaid_yes'){
            this.setState({ prepaid: e.target.value, q7_show: 'initial'
            }, () => {
              console.log("=> prepaid_yes: " + this.state.prepaid)
            });
        }
        if(e.target.id === 'prepaid_no'){
            this.setState({ prepaid: e.target.value, q7_show: 'none'
            }, () => {
              console.log("=> prepaid_no: " + this.state.prepaid)
            });
        }
    }

    componentDidMount(){
    }
    
    render() {
        return(
            <div className="mainContent">
                <Container>
                    <Jumbotron style={{ marginTop: 15 }} className="shadow-sm p-3 mb-5 bg-white rounded">
                        
                        {/* <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-2" /> */}
                        {/* Fisrt form ::: student demographics data */}
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="code">Código estudiante</Label>
                                <Input type="text" name="code" id="code" placeholder="" onChange={this.handleInputChange} maxLength="5" />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="first_name">Nombres</Label>
                                <Input type="text" name="first_name" id="first_name" placeholder="" onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="last_name">Apellidos</Label>
                                <Input type="password" name="last_name" id="last_name" placeholder="" onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="sy">Periodo escolar</Label>
                                    <Input type="text" name="sy" id="sy" placeholder="" onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="grade">Grado</Label>
                                    {/* <Input type="text" name="grade" id="grade" placeholder="" onChange={this.handleInputChange} /> */}
                                    <CustomInput type="select" name="grade" id="grade" onChange={this.handleInputChange} >
                                        <option value="PK">Prekindergarten</option>
                                        <option value="K">Kindergarten</option>
                                        <option value="1st">First Grade</option>
                                        <option value="2nd">Second Grade</option>
                                        <option value="3rd">Third Grade</option>
                                    </CustomInput>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <Button id="b1_consultar" color="primary">Consultar</Button>            
                            </Col>
                        </Row>
                        { /*End Fisrt form ::: student demographics data */ }
                        
                        <div className="py-2"></div>
                        <h3>Tarifas base</h3>
                        
                        {/* Base rates table */}
                        <Table bordered hover>
                            <thead>
                            <tr>
                                <th>Servicios </th>
                                <th style={{ textAlign: "right" }}>Valor (COP)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Matrícula</th>
                                <td style={{ textAlign: "right" }}>$1234565</td>
                            </tr>
                            <tr>
                                <th scope="row">Pensión</th>
                                <td style={{ textAlign: "right" }}>$1234565</td>
                            </tr>
                            <tr>
                                <th scope="row">Asopadres</th>
                                <td style={{ textAlign: "right" }}>$1234565</td>
                            </tr>
                            </tbody>
                        </Table>
                        {/* End base rates table */}

                        <div className="py-3"></div>
                        
                        <Row>
                            <Col md="6">
                                <h4>Preguntas</h4>
                                <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Jumbotron style={{ backgroundColor : '#fafafa' }}>
                                        <FormGroup style={{ marginBottom: '2rem' }}>
                                            <Label>¿Pago de anualidades futuras?</Label>
                                            <div className="form-inline">
                                                < div className = "form-check form-check-inline" >
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_annual_payments" id="annual_payments_yes" value="YES" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                < div className = "form-check form-check-inline" >
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_annual_payments" id="annual_payments_no" value="NO" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>   
                                                <CustomInput type="select" name="inlineRadioOptions_annual_payments" id="annual_payments_select" className="form-control" style={{ display: this.state.q1_show }} >
                                                    <option>32000000</option>
                                                    <option>16000000</option>
                                                </CustomInput>
                                            </div>
                                        </FormGroup>
                                        <FormGroup style={{ marginBottom: '2rem' }}>
                                            <Label>¿Alguno de los padres es exalumno?</Label>
                                            <div className="form-inline">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_alumni" id="alumni_yes" value="YES" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_alumni" id="alumni_no" value="NO" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup style={{ marginBottom: '2rem' }}>
                                            <Label>¿Tiene hermanos en el colegio?</Label>
                                            < div className = "form-inline">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_siblings" id="siblings_yes" value="YES" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_siblings" id="siblings_no" value="NO" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <label className="form-check-label" style={{ marginRight: 10, display: this.state.q3_show }} >¿Cuantos?</label>
                                                    <CustomInput type="select" name="inlineRadioOptions_annual_payments" id="siblings_select" className="form-control" style={{ display: this.state.q3_show }}>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </CustomInput> 
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup style={{ marginBottom: '2rem' }}>
                                            <Label>¿El aplicante es exalumno del Sta. Barbara Prescchool?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_barbara" id="sta_barbara_alumni_yes" value="YES" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_barbara" id="sta_barbara_alumni_no" value="NO" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup style={{ marginBottom: '2rem' }}>
                                            <Label>¿El aplicante es exalumno de Jardín o Colegio aliado?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_allied_school" id="allied_school_yes" value="YES" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_allied_school" id="allied_school_no" value="NO" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup style={{ marginBottom: '2rem' }}>
                                            <Label>¿Alguno de los padres es empleado del Colegio Rochester?</Label>
                                            <div className = "form-inline" >
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_roch_employee" id="roch_employee_yes" value="YES" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_roch_employee" id="roch_employee_no" value="NO" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                <label className="form-check-label" style={{ marginRight: 10, display: this.state.q6_show }} >Seleccione una opción</label> 
                                                    <CustomInput type="select" name="inlineRadioOptions_annual_payments" id="roch_employee_select" className="form-control" style={{ display: this.state.q6_show }}>
                                                        <option>Docente</option>
                                                        <option>No docente</option>
                                                    </CustomInput>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup style={{ marginBottom: '2rem' }}>
                                            <Label>¿Realizará pago anticipado?</Label>
                                            <div className="form-inline">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_prepaid" id="prepaid_yes" value="YES" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_prepaid" id="prepaid_no" value="NO" onChange={this.handleInputChange}></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <label className="form-check-label" style={{ marginRight: 10, display: this.state.q7_show }} >Seleccione una opción</label> 
                                                    <CustomInput type="select" name="inlineRadioOptions_annual_payments" id="prepaid_select" className="form-control" style={{ display: this.state.q7_show }}>
                                                        <option>5 meses</option>
                                                        <option>20 meses</option>
                                                    </CustomInput>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Jumbotron>
                                </Container> 
                            </Col>
                            <Col md="6">
                                <h4>Selección</h4>
                                <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Jumbotron style={{ backgroundColor : '#fafafa' }}>
                                        hello
                                    </Jumbotron>
                                </Container>
                            </Col>
                        </Row>

                    </Jumbotron>
                </Container>
            </div>
        );
    }
}

export default NewStudents;