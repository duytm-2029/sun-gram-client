import { put, takeEvery } from 'redux-saga/effects';
import * as globalActions from '../actions/global';
import * as actionTypes from '../constants/actionTypes';

const trySetHeaderTitle = function* trySetHeaderTitle() {
  yield put(globalActions.setHeaderTitle);
};

export const watchSetHeaderTitle = function* watchSetHeaderTitle() {
  yield takeEvery(actionTypes.SET_HEADER_TITLE, trySetHeaderTitle);
};
