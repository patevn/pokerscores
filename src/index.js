import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import {loadData} from './actions/trackerActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const store = configureStore();
store.dispatch(loadData());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);