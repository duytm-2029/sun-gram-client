/*
 * Posts Messages
 *
 * This contains all the text for the Posts container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Posts';

export default defineMessages({
  postEdit: {
    id: `${scope}.posts`,
    defaultMessage: 'edit',
  },
  postDel: {
    id: `${scope}.posts`,
    defaultMessage: 'delete',
  },
});
