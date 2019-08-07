/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import messages from './messages';
import LandingPage from '../LandingPage/Loadable';
import * as action from '../../actions/currentUser';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.auth = this.props.auth;
  }

  componentWillMount() {
    this.auth();
  }

  render() {
    return (
      <h1>
        <FormattedMessage {...messages.header} />
        <LandingPage />
      </h1>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: () => dispatch(action.userAuthRequst()),
  };
}

function mapStateToProps(state) {
  return {
    user: state.currenUser,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
