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
      let total1z = initCalculator(chunks[0])
      return Object.assign({}, state, { data: chunks, currentData: chunks[0], totals: total1z })
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

//TODO: prob a better solution then a seperate initCalc, will card it up
function initCalculator(fwd) {
  let totals = totalTemplate.setup();
  fwd.forEach(element => {
    if (element.who === "Matty") {
      totals.Matty.cashWon = round(Number(element.cashWon));
    }
    if (element.who === "Ando") {
      totals.Ando.cashWon = round(Number(element.cashWon));
    }
    if (element.who === "Grady") {
      totals.Grady.cashWon = round(Number(element.cashWon));
    }
    if (element.who === "Greg") {
      totals.Greg.cashWon = round(Number(element.cashWon));
    }
    if (element.who === "Brad") {
      totals.Brad.cashWon = round(Number(element.cashWon));
    }
  });
  return totals;
}

function calculator(fwd) {
  let totals = totalTemplate.setup();
  fwd.currentData.forEach(element => {
    if (element.who === "Matty") {
      totals.Matty.cashWon = round(Number(fwd.totals.Matty.cashWon) + Number(element.cashWon));
    }
    if (element.who === "Ando") {
      totals.Ando.cashWon = round(Number(fwd.totals.Ando.cashWon) + Number(element.cashWon));
    }
    if (element.who === "Grady") {
      totals.Grady.cashWon = round(Number(fwd.totals.Grady.cashWon) + Number(element.cashWon));
    }
    if (element.who === "Greg") {
      totals.Greg.cashWon = round(Number(fwd.totals.Greg.cashWon) + Number(element.cashWon));
    }
    if (element.who === "Brad") {
      totals.Brad.cashWon = round(Number(fwd.totals.Brad.cashWon) + Number(element.cashWon));
    }
  });
  return totals;
}

function round(value) {
  return Number(Math.round(value + 'e' + 2) + 'e-' + 2);
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