import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import * as types from './contants';
import * as actions from './actions';
import * as services from './services';

const tryToPost = function* tryToPost(data) {
  try {
    const res = yield call(services.postUp, data);
    yield put(actions.postSuccess(res.data));
  } catch (err) {
    yield put(actions.postFail(err));
  }
};

const watchSaga = function* watchSaga() {
  yield takeLatest(types.POSTS_REQUEST, tryToPost);
};

export default watchSaga;
