/* eslint-disable react/prefer-stateless-function */
// - Import react components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';
import PrivateRoute from './PrivateRouter';
import Stream from '../containers/stream';

// - Async Components
// const AsyncStream = Loadable({
//   loader: () => import('../containers/stream'),
// });
// const AsyncPostPage = Loadable({
//   loader: () => import('containers/postPage'),
// });

/**
 * Home Router
 */
export class HomeRouter extends Component {
  render() {
    const { enabled, data } = this.props;
    return enabled ? (
      <Switch>
        <PrivateRoute
          path="/"
          component={
            <div>
              <Stream
                homeTitle="header.home"
                posts={data.mergedPosts}
                loadStream={data.loadDataStream}
                hasMorePosts={data.hasMorePosts}
                displayWriting
              />
            </div>
          }
        />
      </Switch>
    ) : (
      ''
    );
  }
}

// - Map dispatch to props if have

/**
 * Map state to props if have
 */

export default withRouter(connect()(HomeRouter));
