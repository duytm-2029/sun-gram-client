import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as actions from '../actions/currentUser';
import * as userServices from '../services/user';

// auth request handler, called by
const userAuthRequest = function* userAuthRequest(feathersApp) {
  try {
    const response = yield call(userServices.authUser, feathersApp);
    yield put(actions.userAuthSuccess(response));
  } catch (error) {
    yield put(actions.userAuthFail());
  }
};

export const watchUserAuth = function* watchUserAuth(feathersApp) {
  // We use takeLatest, because we only want this dispatched one at a time
  // We specify authUserRequest as the handler for this action being dispatched
  yield takeEvery(types.USER_AUTH_REQUEST, userAuthRequest, feathersApp);
};

// attempt to log a user in. This is the handler for our loginSaga
// This handler receives the data in the dispatched action on the log in form
const tryLogin = function* tryLogin(feathersApp, { email, password }) {
  try {
    const info = {
      email,
      password,
    };
    // we store the user we get in the response from making a request against
    // our API
    const res = yield call(userServices.login, feathersApp, info);
    // if success, we'll have access token
    if (res.accessToken) {
      // dispatch the loginSuccess action, sending through the user data returned
      yield put(actions.loginSuccess(res));
    } else {
      // otherwise dispatch loginFailure
      yield put(actions.loginFail());
    }
  } catch (error) {
    // otherwise dispatch loginFailure
    yield put(actions.loginFail());
  }
};
// this is the loginSaga
export const watchLoginUserSaga = function* watchLoginUserSaga(feathersApp) {
  yield takeLatest(types.USER_LOGIN_REQUEST, tryLogin, feathersApp);
};
