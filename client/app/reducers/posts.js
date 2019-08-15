import * as types from '../constants/actionTypes';

const defaultPostsState = {
  ownerUserId: '',
  ownerDisplayName: '',
  creationDate: null,
  image: '',
  body: '',
  id: '',
  commentCounter: null,
};

export const posts = (state = defaultPostsState, action) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        ...action.posts,
      };
    default:
      return state;
  }
};
