// Dependencies
import React, { Component } from 'react';
//import PropType from 'prop-types';

/// UI Elements
import { Container, Row, Col, Card, CardBody,
         CardTitle, Button, CardSubtitle, CardFooter } from 'reactstrap';

/// Components
import Header from '../../Header';

//// Assets
import student1 from '../../images/aaron-burden-60068-unsplash.jpg'
import student2 from '../../images/rawpixel-463437-unsplash.jpg'

class Home extends Component {

  constructor(props){
    super(props);

    this.nextPath_OldStudents = this.nextPath_OldStudents.bind(this);
    this.nextPath_NewStudents = this.nextPath_NewStudents.bind(this);

    this.state={

    }
  }

  nextPath_OldStudents(){
    this.props.history.push('/enrolment_annual_services');
    //this.handleSaveServices();
  }

  nextPath_NewStudents(){
    this.props.history.push('/enrollment_new_students');
    //this.handleSaveServices();
  }

  render() {

    //const { children } = this.props;

    return (
      <div className="Home">
        <Header />

        <Container>
          <Row>
            <h2 className="py-2" style={{ margin: 'auto', fontWeight: 300 }}>Bienvenidos</h2>
          </Row>
          <div className="py-1" />
          <Row>
            {/*<Col sm="6" style={{ paddingTop: 10 }} >
              <Card className="mx-auto" style={{ maxWidth: 320 }}>
                <CardBody>
                  <CardTitle style={{ fontWeight: 300, fontSize: '1.25rem' }}>Estudiantes nuevos</CardTitle>
                  <CardSubtitle style={{ fontWeight: 300}}>Ingreso para padres de estudiantes nuevos</CardSubtitle>
                </CardBody>
                <img width="100%" src={student1} alt="Imagen acceso estudiantes nuevos" />
                <CardFooter>
                  <Button color="primary" onClick={this.nextPath_NewStudents}>Ingresar</Button>
                </CardFooter>
              </Card>
    </Col>*/}

            <Col sm="12" style={{ paddingTop: 20 }} >
              <Card className="mx-auto" style={{ maxWidth: 320 }}>
                <CardBody>
                  <CardTitle style={{ fontWeight: 300, fontSize: '1.25rem' }}>Estudiantes antiguos</CardTitle>
                  <CardSubtitle style={{ fontWeight: 300}}>Ingreso para padres de estudiantes antiguos</CardSubtitle>
                </CardBody>
                <img width="100%" src={student2} alt="Imagen acceso estudiantes antiguos" />
                <CardFooter>
                  <Button color="primary" onClick={this.nextPath_OldStudents}>Ingresar</Button>
                </CardFooter>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;