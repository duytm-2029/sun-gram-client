import * as types from './contants';

const defaultState = {};

const streamReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_TITLE_HEADER:
      // eslint-disable-next-line no-case-declarations
      const { title } = action;
      return {
        ...state,
        title,
      };
    case types.POSTS_SUCCESS:
      console.log(111111111, action);
    default:
      return state;
  }
};
export default streamReducer;
