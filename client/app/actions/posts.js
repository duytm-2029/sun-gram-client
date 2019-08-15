import * as types from '../constants/actionTypes';

export const dbGetPosts = () => ({
  type: types.GET_ALL_POSTS_REQUEST,
});

export const dbGetPostsSuccess = posts => ({
  type: types.GET_ALL_POSTS_SUCCESS,
  ...posts,
});

export const dbGetPostsFail = () => ({
  type: types.GET_ALL_POSTS_FAIL,
});
