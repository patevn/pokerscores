import { combineReducers } from 'redux';
import data from './initReducer';
import iterator from './trackerReducer';

//this is the root reducer, its required when you have more than one reducer (which we will soon)
const rootReducer = combineReducers({
    //this name here means you will be using state.iterator in actions
    data: data,
    iterator: iterator
});

export default rootReducer; 