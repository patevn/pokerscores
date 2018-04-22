import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Menu from './components/Menu';

export default (
    <div>
        <Route path='/' component={Menu} />
        <Route path='/app' component={App} />
    </div>
);