import * as types from '../actions/types';

const initialState = [];

const otherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CARD:
      return [...state, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    default:
      return state;
  }
};
export default otherReducer;
