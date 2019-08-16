import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as services from './services';

import * as types from './constants';
import * as actions from './actions';

const tryGetPosts = function* tryGetPosts() {
  try {
    const res = yield call(services.getPosts);
    yield put(actions.getPostsSuccess({ posts: res.data }));
  } catch (error) {
    yield put(actions.getPostsFail, error);
  }
};

export default function* watchGetPosts() {
  yield takeLatest(types.GET_ALL_POSTS_REQUEST, tryGetPosts);
}
