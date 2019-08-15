import * as actionTypes from '../constants/actionTypes';

export const global = (state = { title: '' }, action) => {
  switch (action.type) {
    case actionTypes.SET_HEADER_TITLE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
};
