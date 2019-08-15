/*
 * Comment Messages
 *
 * This contains all the text for the Comment component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Comment';

export default defineMessages({
  replyButon: {
    id: `${scope}.replyButon`,
    defaultMessage: 'reply',
  },
  editButton: {
    id: `${scope}.editButon`,
    defaultMessage: 'edit',
  },
  deleteButton: {
    id: `${scope}.deleteButton`,
    defaultMessage: 'delete',
  },
  updateButton: {
    id: `${scope}.updateButton`,
    defaultMessage: 'Update',
  },
  cancelButton: {
    id: `${scope}.cancelButton`,
    defaultMessage: 'Cancel',
  },
});
