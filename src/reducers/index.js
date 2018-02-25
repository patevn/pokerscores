import { combineReducers } from 'redux';
import kassie from './initReducer';
import iterator from './trackerReducer';

//this is the root reducer, its required when you have more than one reducer (which we will soon)
const rootReducer = combineReducers({
    //this name here means you will be using state.kassie in actions
    kassie: kassie
});

export default rootReducer; 