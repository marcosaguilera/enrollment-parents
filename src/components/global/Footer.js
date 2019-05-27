//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Assets
import './css/Footer.css';

class Footer extends Component {

  static propTypes = {
    copyright: PropTypes.string
  };

  constructor(){
    super();

    this.state={
      year: ''
    }
  }

  componentDidMount(){
    var now = new Date();
    var nowYear = now.getFullYear();
    //console.log(now + " /// " + nowYear)

    this.setState({
        year: nowYear
    })
}

  render() {
    const { copyright = '&copy; React 2018' } = this.props
    return (
      <div className="Footer bg-light text-dark">
        <footer className="footer">
            <div className="container">
              <p> {copyright} {this.state.year} | <a href="https://rochester.edu.co/politica-de-datos/" rel="noopener noreferrer" target="_blank"> Protección de Datos</a> </p> 
            </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
