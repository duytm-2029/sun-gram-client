/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../../components/Home';

import * as postsAction from '../../actions/posts';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.loadPublicTimeline();
  }

  render() {
    return <Home data={this.props.uid} />;
  }
}
function mapStateToProps() {
  return {
    uid: '1234567890',
  };
}
const mapDispatchToProps = {
  loadPublicTimeline: postsAction.dbGetPosts,
};
HomePage.propTypes = {
  uid: PropTypes.string,
  loadPublicTimeline: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
