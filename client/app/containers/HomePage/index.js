/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { compose } from 'redux';
import Home from '../../components/Home';
import saga from './saga';
import reducer from './reducer';
import * as actions from './actions';

const key = 'home';

function HomePage({ loadData, uid }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadData();
  }, []);

  return <Home data={uid} />;
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: () => dispatch(actions.getPostsRequest()),
  };
}

function mapStateToProps(state) {
  return {
    uid: '1234567890',
  };
}

HomePage.propTypes = {
  uid: PropTypes.string,
  loadData: PropTypes.func,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
