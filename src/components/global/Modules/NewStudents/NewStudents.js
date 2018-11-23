// Dependencies
import React, { Component } from 'react';
import PropType from 'prop-types';

/// UI Elements
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CustomInput,
         CardTitle, CardSubtitle, Button, Jumbotron, FormGroup, Label, Input, Table } from 'reactstrap';

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
            annual_payments: '', parent_alumni: '', siblings: '', sta_barbara_alumni: '', allied_school: '', roch_employee: '', prepaid: ''

        }
    }

    handleInputChange(e){
        if(e.target.id === 'student_code_input'){
            this.setState({
              student_code: String(e.target.value)
            }, () => {
              console.log("=> code: " + this.state.student_code)
            });
          }

    }

    componentDidMount(){

    }
    
    render() {
        return(
            <div>
                <Container>
                    <Jumbotron style={{ marginTop: 15 }} className="shadow-sm p-3 mb-5 bg-white rounded">
                        
                        {/* <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-2" /> */}
                        
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="code">Código estudiante</Label>
                                <Input type="text" name="code" id="code" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="first_name">Nombres</Label>
                                <Input type="text" name="first_name" id="first_name" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="last_name">Apellidos</Label>
                                <Input type="password" name="last_name" id="last_name" placeholder="" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="sy">Periodo escolar</Label>
                                <Input type="text" name="sy" id="sy" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="grade">Grado</Label>
                                <Input type="text" name="grade" id="grade" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <Button color="primary">Consultar</Button>            
                            </Col>
                        </Row>

                        <div className="py-3"></div>
                        <h3>Tarifas base</h3>

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

                        <div className="py-3"></div>
                        
                        <Row>
                            <Col md="6">
                                <h4>Preguntas</h4>
                                <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Jumbotron>
                                        <FormGroup>
                                            <Label>¿Pago de anualidades futuras?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_annual_payments" id="annual_payments_yes" value="YES"></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_annual_payments" id="annual_payments_no" value="NO"></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>¿Alguno de los padres es exalumno?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_alumni" id="alumni_yes" value="YES"></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_alumni" id="alumni_no" value="NO"></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>¿Tiene hermanos en el colegio?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_siblings" id="siblings_yes" value="YES"></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_siblings" id="siblings_no" value="NO"></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>¿El aplicante es exalumno del Sta. Barbara Prescchool?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_barbara" id="sta_barbara_alumni_yes" value="YES"></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_barbara" id="sta_barbara_alumni_no" value="NO"></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>¿El aplicante es exalumno de Jardín o Colegio aliado?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_allied_school" id="allied_school_yes" value="YES"></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_allied_school" id="allied_school_no" value="NO"></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>¿Alguno de los padres es empleado del Colegio Rochester?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_roch_employee" id="roch_employee_yes" value="YES"></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_roch_employee" id="roch_employee_no" value="NO"></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>¿Realizará pago anticipado?</Label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_prepaid" id="prepaid_yes" value="YES"></input>
                                                    <label className="form-check-label" >Si</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions_prepaid" id="prepaid_no" value="NO"></input>
                                                    <label className="form-check-label" >No</label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Jumbotron>
                                </Container> 
                            </Col>
                            <Col md="6">
                                <h4>Selección</h4>
                                <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Jumbotron>
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