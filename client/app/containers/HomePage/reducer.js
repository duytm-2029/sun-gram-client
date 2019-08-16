import * as types from './constants';

const defaultPostsState = {};

const postsReducer = (state = defaultPostsState, action) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_SUCCESS:
      return { ...state, ...action.posts };
    default:
      return state;
  }
};

export default postsReducer;
