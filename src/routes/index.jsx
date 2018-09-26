import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import PageNotFound from '../views/PageNotFound';
import Betting from '../views/Betting';

const RoutedApp = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/betting" component={Betting}/>
        <Route path="/betting/:id" component={Betting} />
        <Route path="*" component={PageNotFound}/>
    </Switch>
)

export default RoutedApp;
