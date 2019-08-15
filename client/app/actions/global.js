import * as actionTypes from '../constants/actionTypes';

export const setHeaderTitle = title => ({
  type: actionTypes.SET_HEADER_TITLE,
  title,
});
