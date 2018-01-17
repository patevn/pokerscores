import * as types from '../actions/actionTypes';
import moment from 'moment';
import sortBy from "lodash/sortBy";

export default function iteratorReducer(state, action) {
  if (state == null)
    state = [];
  switch (action.type) {
    case types.LOAD:
      // think ...state is wrong
      return [...state, Object.assign({}, chunker(action.result.data))
      ];
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

