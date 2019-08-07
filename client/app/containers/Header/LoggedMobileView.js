import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MoreIcon from '@material-ui/icons/MoreVert';

export default function LoginView(props) {
  const { currentUser, mobileMenuId, handleMobileMenuOpen } = props.varible;
  if (currentUser) {
    return (
      <div>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
    );
  }
  return (
    <div>
      <Button color="inherit">Home</Button>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Signup</Button>
    </div>
  );
}
