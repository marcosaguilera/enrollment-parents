import React, { Component } from 'react';
import './global/css/App.css';

//Components declaration
import Header from './global/Header'
import Content from './global/Content'
import Footer from './global/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        
          <Header />
          <Content />
          <Footer copyright="&copy;Colegio Rochester 2018" />
     
      </div>
    );
  }
}

export default App;
