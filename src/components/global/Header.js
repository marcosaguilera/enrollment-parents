import React, { Component } from 'react';
import logo from './images/logo_spanish.png';
import './css/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header className="Header-header">
          <img src={logo} className="Header-logo" alt="logo" />
          <h4 className="Header-title">Colegio Rochester</h4>
          <h6 className="Header-title">Liquidador de Matrícula - 2018</h6>
        </header>
      </div>
    );
  }
}

export default Header;
