import React, { Component } from 'react';
import PropTypes from 'prop-types';

//////// Assets
import './css/Content.css';

class Content extends Component {
//////// Controller

  static propTypes = {
    body: PropTypes.object.isRequired
  }

  /////////////////////////////////
  //////// Rendering UI ///////////
  /////////////////////////////////
  render() {

    const { body } = this.props;
    console.log(this.props);

    return (
      <div className="Content">
        {body} 
      </div>
  
    );
  }
}

export default Content;