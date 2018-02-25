import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import { loadData } from './actions/initActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const initialState = configureStore();
initialState.dispatch(loadData());

//move this back into into (original) configure store class 
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, reduxImmutableStateInvariant(), logger)
    );
}

render(
    <Provider store={initialState}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);