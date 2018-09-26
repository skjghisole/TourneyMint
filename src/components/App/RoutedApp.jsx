import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { LandingPage } from '../../routes/LoadableRoute'

const RoutedApp = () => (
    <Router>
        <Switch>
            <Route path="/" component={LandingPage} />
        </Switch>
    </Router>
)

export default RoutedApp;