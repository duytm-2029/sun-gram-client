import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import Stream from './loadStream';

import * as actions from './actions';

const key = 'stream';
const titleHeader = 'home';

function LoadStream({ posts, hasMorePosts, displayWriting, setTitleHeader }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    setTitleHeader(titleHeader);
  }, []);
  return (
    <Stream
      posts={posts}
      hasMorePosts={hasMorePosts}
      displayWriting={displayWriting}
    />
  );
}

LoadStream.propTypes = {
  homeTitle: PropTypes.string,
  posts: PropTypes.array,
  hasMorePosts: PropTypes.any,
  displayWriting: PropTypes.any,
};

function mapStateToProps(state) {}
function mapDispatchToProps(dispatch) {
  return {
    setTitleHeader: t => dispatch(actions.setTitleHeader(t)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoadStream);
