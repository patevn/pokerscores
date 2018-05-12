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
      let totalz = calculator(state)
      return Object.assign({}, state, { totals: totalz, currentData: state.data[next], iterator: next })
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

function calculator(fwd) {
  let totals = totalTemplate.setup();
  fwd.currentData.forEach(element => {
    if (element.who === "Matty") {
      totals.Matty.currentPosition = Number(element.position);
      totals.Matty.cashWon = round(Number(fwd.totals.Matty.cashWon) + Number(element.cashWon));
      totals.Matty.totalPoints = round(Number(fwd.totals.Matty.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Matty.asshole = adder(fwd.totals.Matty.asshole, element.asshole)) : (totals.Matty.asshole = fwd.totals.Matty.asshole);
      element.president === true ? (totals.Matty.president = adder(fwd.totals.Matty.president, element.president)) : (totals.Matty.president = fwd.totals.Matty.president);
    }
    if (element.who === "Ando") {
      totals.Matty.currentPosition = Number(element.position);
      totals.Ando.cashWon = round(Number(fwd.totals.Ando.cashWon) + Number(element.cashWon));
      totals.Ando.totalPoints = round(Number(fwd.totals.Ando.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Ando.asshole = adder(fwd.totals.Ando.asshole, element.asshole)) : (totals.Ando.asshole = fwd.totals.Ando.asshole);
      element.president === true ? (totals.Ando.president = adder(fwd.totals.Ando.president, element.president)) : (totals.Ando.president = fwd.totals.Ando.president);
    }
    if (element.who === "Grady") {
      totals.Matty.currentPosition = Number(element.position);
      totals.Grady.cashWon = round(Number(fwd.totals.Grady.cashWon) + Number(element.cashWon));
      totals.Grady.totalPoints = round(Number(fwd.totals.Grady.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Grady.asshole = adder(fwd.totals.Grady.asshole, element.asshole)) : (totals.Grady.asshole = fwd.totals.Grady.asshole);
      element.president === true ? (totals.Grady.president = adder(fwd.totals.Grady.president, element.president)) : (totals.Grady.president = fwd.totals.Grady.president);
    }
    if (element.who === "Greg") {
      totals.Matty.currentPosition = Number(element.position);
      totals.Greg.cashWon = round(Number(fwd.totals.Greg.cashWon) + Number(element.cashWon));
      totals.Greg.totalPoints = round(Number(fwd.totals.Greg.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Greg.asshole = adder(fwd.totals.Greg.asshole, element.asshole)) : (totals.Greg.asshole = fwd.totals.Greg.asshole);
      element.president === true ? (totals.Greg.president = adder(fwd.totals.Greg.president, element.president)) : (totals.Greg.president = fwd.totals.Greg.president);
    }
    if (element.who === "Brad") {
      totals.Matty.currentPosition = Number(element.position);
      totals.Brad.cashWon = round(Number(fwd.totals.Brad.cashWon) + Number(element.cashWon));
      totals.Brad.totalPoints = round(Number(fwd.totals.Brad.totalPoints) + Number(element.position));
      element.asshole === true ? (totals.Brad.asshole = adder(fwd.totals.Brad.asshole, element.asshole)) : (totals.Brad.asshole = fwd.totals.Brad.asshole);
      element.president === true ? (totals.Brad.president = adder(fwd.totals.Brad.president, element.president)) : (totals.Brad.president = fwd.totals.Brad.president);
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