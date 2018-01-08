import * as types from './actionTypes';
import * as axios from 'axios';

export function undo(iterator) {
    return { type: types.UNDO, iterator: iterator }
}

export function redo(iterator) {
    return { type: types.REDO, iterator: iterator }
}

export function loadScores(result) {
    return { type: types.LOAD, result: result }
}

export function loadData() {
    return function (dispatch) {
        return axios.get('https://pokerscores-a9da7.firebaseio.com/scores.json').then(result => {
            dispatch(loadScores(result));
        }).catch(function (error) {
            console.log(error);
        });
    }
}