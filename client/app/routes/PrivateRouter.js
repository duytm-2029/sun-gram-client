/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export class PrivateRoute extends Component {
  render() {
    const { authed, path, component } = this.props;
    return (
      <Route
        path={path}
        render={() => (authed ? (() => component)() : <Redirect to="/login" />)}
      />
    );
  }
}

const mapStateToProps = () => ({
  authed: true,
});

export default connect(mapStateToProps)(PrivateRoute);
