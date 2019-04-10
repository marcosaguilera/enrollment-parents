import React, { Component } from 'react';
//// Other dependencies
import axios from 'axios';
import NumberFormat from 'react-number-format';
import store from '../../../../ReduxStore/store'

//// Addons
import LoadingModal from '../../Addons/LoadSpinner';
import ModalUI from '../../Addons/Modal';
import ModalUI2 from '../../Addons/Modal';

//////// Assets
import '../../Modules/Services/Services.css';

//Components declaration
import Footer from '../../Footer'
import ServiceTbale from '../ServiceTable/ServiceTable'

class ServicesMontly extends Component {
    render() {
        return (
         <div>
            <main role="main"  className="container" id="customStyle">
                <div className="shadow-sm p-3 mb-5 bg-white rounded">

                </div>
            </main>
         </div>
        );
    }
}

export default ServicesMontly;