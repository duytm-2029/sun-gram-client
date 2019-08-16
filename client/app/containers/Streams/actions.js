import * as types from './contants';

export const setTitleHeader = title => ({
  type: types.SET_TITLE_HEADER,
  title,
});
// posts
export const postRequest = (data, cb) => {
  cb();
  return {
    type: types.POSTS_REQUEST,
    data,
  };
};

export const postSuccess = res => ({
  type: types.POSTS_SUCCESS,
  res,
});

export const postFail = err => ({
  type: types.POSTS_FAIL,
  err,
});
