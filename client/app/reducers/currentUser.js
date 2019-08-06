import * as types from '../actions/types';

const initialState = {};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_AUTH_SUCCESS:
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        ...action.currentUser,
      };

    default:
      return state;
  }
};

export default currentUserReducer;
