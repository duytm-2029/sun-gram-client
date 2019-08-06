/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import LoginPage from '../LoginPage/Loadable';

export default function HomePage(props) {
  // eslint-disable-next-line react/prop-types
  const { location } = props;
  return (
    <h1>
      <FormattedMessage {...messages.header} />
      <LoginPage location={location} />
    </h1>
  );
}
