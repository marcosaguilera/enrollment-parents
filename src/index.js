// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// Router
import AppRoutes from './routes'

// Assets
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

render(
    <Router>
        <AppRoutes />
    </Router>, 
    document.getElementById('root')
);
registerServiceWorker();
