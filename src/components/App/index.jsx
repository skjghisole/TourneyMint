import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import routes from "../../routes";

var hist = createBrowserHistory();


const App = () =>
    <Router history={hist}>
        <Switch>
            {routes.map((prop, key) => {
                return <Route path={prop.path} key={key} component={prop.component} />;
            })}
        </Switch>
    </Router>;


export default App;