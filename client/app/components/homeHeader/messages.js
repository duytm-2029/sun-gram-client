/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

export default defineMessages({
  logo: {
    id: `${scope}.logo`,
    defaultMessage: 'Sun*Gram',
  },
  myAccount: {
    id: `${scope}.account`,
    defaultMessage: 'My Account',
  },
  logOut: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
});
