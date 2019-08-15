/*
 * Notify Messages
 *
 * This contains all the text for the Notify container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.notify';

export default defineMessages({
  notingNotify: {
    id: `${scope}.notify`,
    defaultMessage: 'All caught up!',
  },
});
