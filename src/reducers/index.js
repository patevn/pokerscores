import { combineReducers } from 'redux';
import kassie from './initReducer';

const rootReducer = combineReducers({
    //this name here means you will be using state.kassie in actions
    kassie: kassie
});

export default rootReducer; 