import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/App';
import Menu from './components/Menu';

export default (
    <Router history={browserHistory}>>
        <Route path='/' component={Menu} />
        <Route path='/app' component={App} />
    </Router>
);