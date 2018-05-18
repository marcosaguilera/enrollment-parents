// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Resume from './components/global/Modules/Resume/Resume'
import Help from './components/global/Modules/Help/Help'
import Page404 from './components/global/Modules/Page404/Page404'

const AppRoutes = () => 
    <App>
        <Switch>
            <Route exact path="/resume" component={Resume} />
            <Route exact path="/help" component={Help} />
            <Route exact component={Page404} />
        </Switch>
    </App>      

export default AppRoutes;
