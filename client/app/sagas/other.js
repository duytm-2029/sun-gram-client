import { put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import { loadCard } from '../actions/currentUser';

// loadcard handler, by called
const tryToLoadCard = function* tryToLoadCard() {
  yield put(loadCard);
};

// wath load card handler
export const watchLoadCard = function* watchLoadCard() {
  yield takeLatest(types.LOAD_CARD, tryToLoadCard);
};
