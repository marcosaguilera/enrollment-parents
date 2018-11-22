// Dependencies
import React, { Component } from 'react';
import PropType from 'prop-types';

/// UI Elements
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
         CardTitle, CardSubtitle, Button } from 'reactstrap';

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
    this.props.history.push('/enrollment_old_students');
    //this.handleSaveServices();
  }
  
  nextPath_NewStudents(){
    this.props.history.push('/enrollment_new_students');
    //this.handleSaveServices();
  }

  render() {

    const { children } = this.props;

    return (
      <div className="Home">
        <Header />
        
        <Container>
          <br />
          <Row>
            <h1 style={{ margin: 'auto' }}>Bienvenidos</h1>
          </Row>
          <br />
          <br />
          <Row>
            <Col sm="6" style={{ paddingTop: 10 }} >
              <Card className="mx-auto" style={{ maxWidth: 320 }}>
                  <CardImg top width="100%" src={student1} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Estudiantes Nuevos</CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button color="primary" onClick={this.nextPath_NewStudents}>Ingresar</Button>
                  </CardBody>
              </Card>
            </Col>

            <Col sm="6" style={{ paddingTop: 10 }} >
              <Card className="mx-auto" style={{ maxWidth: 320 }}>
                <CardImg top width="100%" src={student2} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Estudiantes Antiguos</CardTitle>
                  {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  <Button color="primary" onClick={this.nextPath_OldStudents}>Ingresar</Button>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;