//Dependencies
import React, { Component } from 'react';
import PropType from 'prop-types';

//Components declaration
import Content from './global/Content'

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
          <Content body={children}/>
      </div>
    );
  }
}

export default App;
