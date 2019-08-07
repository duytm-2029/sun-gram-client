import React from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import messages from './messages';

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography component="h1" variant="h5">
        <FormattedMessage {...messages.logo} />
      </Typography>
    </div>
  );
}

export default Header;
