import * as types from '../actions/actionTypes';
import moment from 'moment';
import sortBy from "lodash/sortBy";
import totalTemplate from './totalTemplate';

export default function initReducer(state = {
  totals: totalTemplate.setup(),
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
    case types.TOTAL:
      let totalz = calculator(state)
      return Object.assign({}, state, { totals: totalz })
    default:
      return state;
  }
}

function calculator(fwd) {
  let totals = totalTemplate.setup();
  fwd.currentData.forEach(element => {
    if (element.who == "Matty") {
      totals.Matty.cashWon = Number(fwd.totals.Matty.cashWon) + Number(element.cashWon);
    }
    if (element.who == "Ando") {
      totals.Ando.cashWon = Number(fwd.totals.Ando.cashWon) + Number(element.cashWon);
    }
    if (element.who == "Grady") {
      totals.Grady.cashWon = Number(fwd.totals.Grady.cashWon) + Number(element.cashWon);
    }
    if (element.who == "Greg") {
      totals.Greg.cashWon = Number(fwd.totals.Greg.cashWon) + Number(element.cashWon);
    }
    if (element.who == "Brad") {
      totals.Brad.cashWon = Number(fwd.totals.Brad.cashWon) + Number(element.cashWon);
    }
  });
  return totals;
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


