import { call, put, takeEvery } from 'redux-saga/effects';
import * as postsActions from '../actions/posts';
import * as actionTypes from '../constants/actionTypes';
import * as postsService from '../services/posts';

const tryGetPosts = function* tryGetPosts() {
  try {
    const res = yield call(postsService.getPublicTimeline);
    yield put(postsActions.dbGetPostsSuccess({ posts: res }));
  } catch (error) {
    yield put(postsActions.dbGetPostsFail());
  }
};

export const getPostsSaga = function* getPostsSaga() {
  yield takeEvery(actionTypes.GET_ALL_POSTS_REQUEST, tryGetPosts);
};
