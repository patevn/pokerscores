import * as types from '../actions/actionTypes';
import moment from 'moment';
import sortBy from "lodash/sortBy";
import totalTemplate from './totalTemplate';
import undoable, { distinctState } from 'redux-undo';

const undoableTodos = undoable(initReducer, {
  filter: distinctState()
})

function initReducer(state = {
  totals: totalTemplate.setup(),
  data: [],
  currentData: null,
  iterator: 0,
  season: 0
}, action) {

  switch (action.type) {
    case types.LOAD:
      return Object.assign({}, state, { data: action.result.data })
    case types.SEASON1:
      let chunks1 = chunker(state.data, 1);
      let tempTotals1 = initCalculator(chunks1[0])
      return Object.assign({}, state, { data: chunks1, currentData: chunks1[0], totals: tempTotals1, season: 1 })
    case types.SEASON2:
      let chunks2 = chunker(state.data, 2);
      let tempTotals2 = initCalculator(chunks2[0])
      return Object.assign({}, state, { data: chunks2, currentData: chunks2[0], totals: tempTotals2, season: 2 })
    case types.CALC:
      let next = state.iterator + 1
      let _currentData = state.data[next];
      let totalz = calculator(_currentData, state)
      return Object.assign({}, state, { totals: totalz, currentData: _currentData, iterator: next })
    default:
      return state;
  }
}

//TODO: prob a better solution then a seperate initCalc, will card it up
function initCalculator(fwd) {
  let totals = totalTemplate.setup();
  fwd.forEach(element => {
    if (element.who === "Matty") {
      totals.Matty.currentPosition = Number(element.position);
      totals.Matty.cashWon = round(Number(element.cashWon));
      totals.Matty.totalPoints = round(Number(element.position));
      totals.Matty.asshole = element.asshole === true ? 1 : 0;
      totals.Matty.president = element.president === true ? 1 : 0;
    }
    if (element.who === "Ando") {
      totals.Ando.currentPosition = Number(element.position);
      totals.Ando.cashWon = round(Number(element.cashWon));
      totals.Ando.totalPoints = round(Number(element.position));
      totals.Ando.asshole = element.asshole === true ? 1 : 0;
      totals.Ando.president = element.president === true ? 1 : 0;
    }
    if (element.who === "Grady") {
      totals.Grady.currentPosition = Number(element.position);
      totals.Grady.cashWon = round(Number(element.cashWon));
      totals.Grady.totalPoints = round(Number(element.position));
      totals.Grady.asshole = element.asshole === true ? 1 : 0;
      totals.Grady.president = element.president === true ? 1 : 0;
    }
    if (element.who === "Greg") {
      totals.Greg.currentPosition = Number(element.position);
      totals.Greg.cashWon = round(Number(element.cashWon));
      totals.Greg.totalPoints = round(Number(element.position));
      totals.Greg.asshole = element.asshole === true ? 1 : 0;
      totals.Greg.president = element.president === true ? 1 : 0;
    }
    if (element.who === "Brad") {
      totals.Brad.currentPosition = Number(element.position);
      totals.Brad.cashWon = round(Number(element.cashWon));
      totals.Brad.totalPoints = round(Number(element.position));
      totals.Brad.asshole = element.asshole === true ? 1 : 0;
      totals.Brad.president = element.president === true ? 1 : 0;
    }
  });
  return totals;
}

function calculator(fwd, state) {
  let totals = totalTemplate.setup();
  fwd.forEach(element => {
    if (element.who === "Matty") {
      totals.Matty.currentPosition = Number(element.position);
      totals.Matty.cashWon = round(Number(state.totals.Matty.cashWon) + Number(element.cashWon));
      totals.Matty.totalPoints = round(Number(state.totals.Matty.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Matty.asshole = adder(state.totals.Matty.asshole, element.asshole)) : (totals.Matty.asshole = state.totals.Matty.asshole);
      element.president === true ? (totals.Matty.president = adder(state.totals.Matty.president, element.president)) : (totals.Matty.president = state.totals.Matty.president);
    }
    if (element.who === "Ando") {
      totals.Ando.currentPosition = Number(element.position);
      totals.Ando.cashWon = round(Number(state.totals.Ando.cashWon) + Number(element.cashWon));
      totals.Ando.totalPoints = round(Number(state.totals.Ando.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Ando.asshole = adder(state.totals.Ando.asshole, element.asshole)) : (totals.Ando.asshole = state.totals.Ando.asshole);
      element.president === true ? (totals.Ando.president = adder(state.totals.Ando.president, element.president)) : (totals.Ando.president = state.totals.Ando.president);
    }
    if (element.who === "Grady") {
      totals.Grady.currentPosition = Number(element.position);
      totals.Grady.cashWon = round(Number(state.totals.Grady.cashWon) + Number(element.cashWon));
      totals.Grady.totalPoints = round(Number(state.totals.Grady.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Grady.asshole = adder(state.totals.Grady.asshole, element.asshole)) : (totals.Grady.asshole = state.totals.Grady.asshole);
      element.president === true ? (totals.Grady.president = adder(state.totals.Grady.president, element.president)) : (totals.Grady.president = state.totals.Grady.president);
    }
    if (element.who === "Greg") {
      totals.Greg.currentPosition = Number(element.position);
      totals.Greg.cashWon = round(Number(state.totals.Greg.cashWon) + Number(element.cashWon));
      totals.Greg.totalPoints = round(Number(state.totals.Greg.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Greg.asshole = adder(state.totals.Greg.asshole, element.asshole)) : (totals.Greg.asshole = state.totals.Greg.asshole);
      element.president === true ? (totals.Greg.president = adder(state.totals.Greg.president, element.president)) : (totals.Greg.president = state.totals.Greg.president);
    }
    if (element.who === "Brad") {
      totals.Brad.currentPosition = Number(element.position);
      totals.Brad.cashWon = round(Number(state.totals.Brad.cashWon) + Number(element.cashWon));
      totals.Brad.totalPoints = round(Number(state.totals.Brad.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Brad.asshole = adder(state.totals.Brad.asshole, element.asshole)) : (totals.Brad.asshole = state.totals.Brad.asshole);
      element.president === true ? (totals.Brad.president = adder(state.totals.Brad.president, element.president)) : (totals.Brad.president = state.totals.Brad.president);
    }
  });
  return totals;
}

function adder(x, y) {
  return (x + y);
}

function round(value) {
  return Number(Math.round(value + 'e' + 2) + 'e-' + 2);
}

let chunker = function (data, season) {
  let sort = sortBy(data, function (o) { return new moment(o.gameDate); });
  const filterer = sort.filter(sorts => sorts.season === season);
  let chunks = chunker(filterer, 5);

  function chunker(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }
  return chunks;
}

export default undoableTodos;