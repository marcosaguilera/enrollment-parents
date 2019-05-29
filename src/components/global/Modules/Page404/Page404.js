// Dependencies
import React, { Component } from 'react';

class Page404 extends Component {

  componentDidMount(){
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="Page404">
        <h1>Page404</h1>
      </div>
    );
  }
}

export default Page404;