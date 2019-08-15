/*
 * Home Messages
 *
 * This contains all the text for the Home component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.home';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  setting: {
    id: `${scope}.setting`,
    defaultMessage: 'Setting',
  },
});
