import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import PropTypes from 'prop-types';

import './Modal.css';

class ModalWindow extends Component {

  constructor(){
    super();

    this.onClickClose  =  this.onClickClose.bind(this);
  }

  onClickClose(){
    console.log(this.props.show);
  }
  // Props definitions
  static propTypes = {
    onClose  : PropTypes.func.isRequired,
    show     : PropTypes.bool,
    children : PropTypes.node,
    title    : PropTypes.string.isRequired,
    msn      : PropTypes.string.isRequired,
    img_url  : PropTypes.string
  }

  // event handling methods go here
  render() {
    let url_long = this.props.img_url.length
    //console.log(url_long)

    if(!this.props.show) { return null }

    return (
      <Modal role="dialog" visible={this.props.show} onClickBackdrop={this.modalBackdropClicked}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="exampleModalLongTitle">{this.props.title}</h5>
            </div>
            <div className="modal-body bg-light text-dark">
              <div id="budget-container" style={{ display: url_long > 0 ? 'inherit' : 'none'  }}>
                <img id="budget" src={this.props.img_url} alt="excellency budget" />
              </div>
              <p id="texty">{this.props.msn}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                Close
              </button>
            </div>
      </Modal>
    );
  }
}

export default ModalWindow;