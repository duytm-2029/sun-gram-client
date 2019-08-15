/*
 * shareDialog Messages
 *
 * This contains all the text for the shareDialog container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.postWrite';

export default defineMessages({
  alertCopied: {
    id: `${scope}.sharedialog`,
    defaultMessage: 'Link has been copied to clipboard ...',
  },
});
