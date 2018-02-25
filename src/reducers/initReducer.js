import * as types from '../actions/actionTypes';
import moment from 'moment';
import sortBy from "lodash/sortBy";

export default function initReducer(state = {
  totals: totalSetup,
  data: [],
  currentData: null,
  iterator: 0
}, action) {

  switch (action.type) {
    case types.LOAD:
      let chunks = chunker(action.result.data);
      return Object.assign({}, state, { data: chunks, currentData: chunks[0] })
    case types.REDO:
      let next = state.iterator + 1
      return Object.assign({}, state, { currentData: state.data[next], iterator: next })
    case types.UNDO:
      let previous = state.iterator - 1
      return Object.assign({}, state, { currentData: state.data[previous], iterator: previous })
    default:
      return state;
  }
}

let chunker = function (data) {
  let sort = sortBy(data, function (o) { return new moment(o.gameDate); });
  let chunks = chunker(sort, 5);

  function chunker(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }
  return chunks;
}

let totalSetup =
  {
    "Matty": {
      "cashWon": 0,
      "position": 0,
      "asshole": false,
      "president": false
    },
    "Grady": {
      "cashWon": 0,
      "position": 0,
      "asshole": false,
      "president": false
    },
    "Greg": {
      "cashWon": 0,
      "position": 0,
      "asshole": false,
      "president": false
    },
    "Brad": {
      "cashWon": 0,
      "position": 0,
      "asshole": false,
      "president": false
    },
    "Ando": {
      "cashWon": 0,
      "position": 0,
      "asshole": false,
      "president": false
    }
  }

