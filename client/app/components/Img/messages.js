/*
 * Image Messages
 *
 * This contains all the text for the Image component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.image';

export default defineMessages({
  notLoaded: {
    id: `${scope}.notloaded`,
    defaultMessage: 'Image not loaded',
  },
});
