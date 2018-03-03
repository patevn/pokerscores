import * as types from '../actions/actionTypes';

export default function totalsReducer(state = 0, action) {
  switch (action.type) {
    case types.TOTAL:
    //todo
    default:
      return state;
  }
}


function calculator() {
  this.state.currentData.forEach(element => {
    if (element == "Matty") {
      alert("Woweee");
    }
  });


}