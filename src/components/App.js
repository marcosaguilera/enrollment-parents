//Dependencies
import React, { Component } from 'react';
import PropType from 'prop-types';

//Components declaration
import Header from './global/Header'
import Content from './global/Content'
import Footer from './global/Footer'

// Assets
import './global/css/App.css';

class App extends Component {

  static propTypes = {
    children : PropType.object.isRequired
  }

  render() {

    const { children } = this.props;

    return (
      <div className="App">

          <Header />
          <Content body={children}/>
          <Footer copyright="&copy;Colegio Rochester 2018" />
     
      </div>
    );
  }
}

export default App;
