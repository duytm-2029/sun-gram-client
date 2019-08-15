// - Import react components
import React, { Component } from 'react';
import classNames from 'classnames';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

// - Import app components

// - Import API

// - Import actions

const styles = theme => ({
  root: {
    width: 360,
    maxWidth: 360,
    backgroundColor: '#efefef',
    minHeight: 376,
    display: 'flex',
  },
  noNotify: {
    color: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  popperOpen: {
    zIndex: 1,
    maxWidth: 500,
    overflowY: 'auto',
  },
  popper: {},
  overflowHidden: {
    overflow: 'hidden',
  },
  list: {
    maxHeight: 380,
    overflowY: 'auto',
    width: '98%',
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto',
    },
  },
});

/**
 * Create component class
 */
export class NotifyComponent extends Component {
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    // Defaul state
    this.state = {};

    // Binding functions to `this`
  }

  notifyItemList = () => {
    const parsedDOM = [];
    return parsedDOM;
  };

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes, anchorEl, onRequestClose, open } = this.props;
    const noNotify = (
      <div className={classes.noNotify}>
        {' '}
        <FormattedMessage {...messages.notingNotify} />{' '}
      </div>
    );
    const items = this.notifyItemList();
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onRequestClose}
        PaperProps={{ className: classNames(classes.paper) }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper
          className={classNames(classes.root, {
            [classes.overflowHidden]: !open,
          })}
          elevation={4}
        >
          {items.length > 0 ? (
            <List className={classes.list}>{items}</List>
          ) : (
            noNotify
          )}
        </Paper>
      </Popover>
    );
  }
}

// - Connect component to redux store
export default withStyles(styles)(NotifyComponent);
