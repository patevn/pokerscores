import * as types from './actionTypes';
import * as axios from 'axios';

export function loadScores(result) {
    return { type: types.LOAD, result: result }
}

//TODO making another action per season rather than passing something in seems silly but itll do for now. fix it later
export function season1(season1) {
    return { type: types.SEASON1, season1 }
}

export function season2(season2) {
    return { type: types.SEASON2, season2 }
}

export function calc(aPileOfState) {
    return { type: types.CALC, aPileOfState: aPileOfState}
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