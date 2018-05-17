import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import PropTypes from 'prop-types';

class LoadSpinner extends Component {

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
    title    : PropTypes.string.isRequired
  }
  
  // event handling methods go here
  render() {

    if(!this.props.show) {
      return null;
    }

    return (
      <Modal role="dialog" visible={this.props.show} onClickBackdrop={this.modalBackdropClicked}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="exampleModalLongTitle">{this.props.title}</h5>
            </div>
            <div className="modal-body bg-light text-dark">
              
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" 
                     role="progressbar" 
                     aria-valuenow="100" 
                     aria-valuemin="0" aria-valuemax="100" style={{width: 100 + '%'}} ></div>
              </div>
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

export default LoadSpinner;