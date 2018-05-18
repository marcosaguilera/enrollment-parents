import React, { Component } from 'react';
import logo from './images/logo.svg';
import './css/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header className="Header-header">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1 className="Header-title">Colegio Rochester</h1>
          <h3 className="Header-title">Liquidador de Matrícula - 2018</h3>
        </header>
      </div>
    );
  }
}

export default Header;
