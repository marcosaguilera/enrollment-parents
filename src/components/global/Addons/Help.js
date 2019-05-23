import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import PropTypes from 'prop-types';

import './Modal.css';



class Help extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    // Props definitions
    static propTypes = {
        onClose  : PropTypes.func.isRequired,
        show     : PropTypes.bool,
        children : PropTypes.node,
        msn      : PropTypes.string.isRequired,
        help_from: PropTypes.string.isRequired
    }

    render() {
        if(!this.props.show) { return null }
        return (
            <div>
                <button className="btn btn-primary btn-lg">Ayuda</button>
                <Modal role="dialog" visible={this.props.show} onClickBackdrop={this.modalBackdropClicked}>
                        <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title" id="exampleModalLongTitle">Ayuda</h5>
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
            </div>
        );
    }
}

export default Help;