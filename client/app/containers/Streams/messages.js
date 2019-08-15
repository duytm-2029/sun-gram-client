/*
 * Stream Messages
 *
 * This contains all the text for the Stream container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Stream';

export default defineMessages({
  notShare: {
    id: `${scope}.stream`,
    defaultMessage: 'Nothing has shared!',
  },
  status: {
    id: `${scope}.stream`,
    defaultMessage: "What's on your mind?",
  },
});
