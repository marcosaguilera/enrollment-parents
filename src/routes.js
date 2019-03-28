// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Resume from './components/global/Modules/Resume/Resume'
import Search from './components/global/Modules/Search/Search'
import Help from './components/global/Modules/Help/Help'
import Print from './components/global/Modules/Print/Print'
import HomeOldStudents from './components/global/Modules/Services/Services'
import HomeNewStudents from './components/global/Modules/NewStudents/NewStudents'
import Home from './components/global/Modules/Home/Home'
import Page404 from './components/global/Modules/Page404/Page404'

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/search" component={Search} />
            <Route exact path="/resume" component={Resume} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/print" component={Print} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/enrollment_old_students" component={HomeOldStudents} />
            <Route exact path="/enrollment_new_students" component={HomeNewStudents} />
            <Route exact component={Page404} />
        </Switch>
    </App>

export default AppRoutes;
