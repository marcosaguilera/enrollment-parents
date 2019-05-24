import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import PropTypes from 'prop-types';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import './Modal.css';
import svg_file from '../images/svgid25.svg';

//// Functions
import Texts from '../../../Utils/Texts'

class Help extends Component {
    constructor(){
        super();

        this.onClickClose  =  this.onClickClose.bind(this)

        this.state = {
            isShowingWindow :  false,
            help_from : '',
            message: ''
        }
    }

    onClickClose(){
        this.setState({ isShowingWindow : !this.state.isShowingWindow })
    }

    // Props definitions
    static propTypes = {
        help_from: PropTypes.string.isRequired
    }

    componentDidMount(){
        console.log(this.props.help_from)
    }

    componentWillReceiveProps(){
        if(this.props.help_from === "step_1"){
            this.setState({ message : Texts.general_texts[0].help_step1 })
        }
        if(this.props.help_from === "step_2"){
            this.setState({ message : Texts.general_texts[0].help_step2 })
        }
        if(this.props.help_from === "step_3"){
            this.setState({ message : Texts.general_texts[0].help_step3 })
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary btn-lg" onClick={ this.onClickClose }>Ayuda</button>
                <Modal role="dialog" visible={this.state.isShowingWindow} onClickBackdrop={this.modalBackdropClicked}>
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="exampleModalLongTitle">Ayuda</h5>
                        </div>
                        <div className="modal-body bg-light text-dark">
                            <div id="budget-container">
                                <img id="budget" src={svg_file} alt="help icon" />
                            </div>
                            <p id="texty">{ReactHtmlParser(this.state.message)}</p>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.onClickClose}>
                            Close
                        </button>
                        </div>
                </Modal>
            </div>
        );
    }
}

export default Help;