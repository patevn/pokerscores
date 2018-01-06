import * as types from './actionTypes';

export function undo(iterator) {
    return { type: types.UNDO, iterator: iterator }
}

export function redo(iterator) {
    return { type: types.REDO, iterator: iterator }
}