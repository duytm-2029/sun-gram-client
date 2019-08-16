import * as types from './constants';

export const getPostsRequest = () => ({
  type: types.GET_ALL_POSTS_REQUEST,
});

export const getPostsSuccess = posts => ({
  type: types.GET_ALL_POSTS_SUCCESS,
  posts,
});

export const getPostsFail = err => ({
  type: types.GET_ALL_POSTS_FAIL,
  ...err,
});
