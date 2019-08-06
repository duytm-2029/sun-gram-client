import * as types from './types';

export const userAuthRequst = () => ({
  type: types.USER_AUTH_REQUEST,
});

export const userAuthSuccess = currentUser => ({
  type: types.USER_AUTH_SUCCESS,
  currentUser,
});

export const userAuthFail = () => ({
  type: types.USER_AUTH_FAIL,
});

export const login = ({ email, password }) => ({
  type: types.USER_LOGIN_REQUEST,
  email,
  password,
});

export const loginSuccess = currentUser => ({
  type: types.USER_LOGIN_SUCCESS,
  currentUser,
});

export const loginFail = () => ({
  type: types.USER_LOGIN_FAIL,
});
