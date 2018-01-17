import * as types from '../actions/actionTypes';

export default function trackerReducer(state, action) {
  if (state == null)
    state = [];
  switch (action.type) {
    case types.UNDO:
      return [...state, Object.assign({}, (action.iterator--))
      ];
    case types.REDO:
      return [...state, Object.assign({}, (action.iterator++))
      ];
    default:
      return state;
  }
}