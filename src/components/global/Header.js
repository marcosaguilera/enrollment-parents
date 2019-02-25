import React, { Component } from 'react';

///// Assets
//import logo from './images/logo_spanish.png';
//import logo2 from './images/logo_ingles-compressor.a196d20c.png';
import logo3 from './images/logo_black_new.png';
import './css/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header className="Header-header">
          <div className="Login-bigAvatar-78">
              <img src={logo3} className="Header-logo" alt="rochester logo" />
          </div>
          {/* <h4 className="Header-title">Rochester School © 2018</h4> */}
          {/* <h6 className="Header-title">Liquidador de Matrícula - 2018</h6> */}
        </header>
      </div>
    );
  }
}

export default Header;
