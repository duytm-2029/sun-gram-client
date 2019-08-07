import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import useStyles from '../materialStyle';

export default function LoginView(props) {
  const { currentUser, menuId, handleProfileMenuOpen } = props.varible;
  const classes = useStyles();
  if (currentUser) {
    return (
      <div>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Grid container justify="center" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src="data:image/jpeg;base64,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"
              className={classes.avatar}
            />
          </Grid>
        </IconButton>
      </div>
    );
  }
  return (
    <div>
      <Button color="inherit">
        <Link to="/" color="inherit" className={classes.link}>
          Home
        </Link>
      </Button>
      <Button color="inherit">
        <Link to="/login" color="inherit" className={classes.link}>
          Login
        </Link>
      </Button>
      <Button color="inherit">
        <Link to="/register" color="inherit" className={classes.link}>
          Signup
        </Link>
      </Button>
    </div>
  );
}
