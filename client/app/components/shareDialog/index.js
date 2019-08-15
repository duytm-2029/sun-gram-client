// - Import react components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SvgImage from '@material-ui/icons/Image';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import SvgLink from '@material-ui/icons/Link';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

import messages from './messages';
// - Import app components

// - Import API

// - Import actions

const styles = theme => ({
  image: {
    verticalAlign: 'top',
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%',
  },
  clipboard: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '10px',
    color: '#1e882d',
    fontWeight: 400,
  },
  networkShare: {
    width: '100%',
    height: '100%',
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto',
    },
  },
  shareLinkPaper: {
    minHeight: 80,
    padding: 10,
    minWidth: 460,
  },
});

/**
 * Create component class
 */
export class ShareDialogComponent extends Component {
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

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const {
      classes,
      shareOpen,
      onClose,
      openCopyLink,
      post,
      onCopyLink,
    } = this.props;
    return (
      <Dialog
        className={classes.fullPageXs}
        title="Share On"
        open={shareOpen}
        onClose={onClose}
      >
        <Paper className={classes.shareLinkPaper}>
          {!openCopyLink ? (
            <MenuList>
              <div>
                <FacebookShareButton
                  onShareWindowClose={onClose}
                  url={`${location.origin}/${post.ownerUserId}/posts/${
                    post.id
                  }`}
                  quote={post.body}
                  hashtag="#facebook"
                >
                  <MenuItem>
                    <ListItemIcon classes={{ root: classes.networkShare }}>
                      <FacebookIcon size={32} round />
                    </ListItemIcon>
                    <ListItemText inset primary="Share in facebook" />
                  </MenuItem>
                </FacebookShareButton>
              </div>
              <div>
                <TwitterShareButton
                  onShareWindowClose={onClose}
                  url={`${location.origin}/${post.ownerUserId}/posts/${
                    post.id
                  }`}
                  quote={post.body}
                  hashtag="#Twiter"
                >
                  <MenuItem>
                    <ListItemIcon classes={{ root: classes.networkShare }}>
                      <TwitterIcon size={32} round />
                    </ListItemIcon>
                    <ListItemText inset primary="Share in Twitter" />
                  </MenuItem>
                </TwitterShareButton>
              </div>
              <div>
                <LinkedinShareButton
                  onShareWindowClose={onClose}
                  url={`${location.origin}/${post.ownerUserId}/posts/${
                    post.id
                  }`}
                  quote={post.body}
                  hashtag="#Linked"
                >
                  <MenuItem>
                    <ListItemIcon classes={{ root: classes.networkShare }}>
                      <LinkedinIcon size={32} round />
                    </ListItemIcon>
                    <ListItemText inset primary="Share in Linked" />
                  </MenuItem>
                </LinkedinShareButton>
              </div>
              <MenuItem onClick={onCopyLink}>
                <ListItemIcon>
                  <SvgLink />
                </ListItemIcon>
                <ListItemText inset primary="Copy link" />
              </MenuItem>
            </MenuList>
          ) : (
            <div>
              <TextField
                autoFocus
                fullWidth
                id="text-field-default"
                defaultValue={`${location.origin}/${post.ownerUserId}/posts/${
                  post.id
                }`}
              />
              <Typography
                className={classNames('animate-top', classes.clipboard)}
                variant="h5"
                component="h2"
              >
                <FormattedMessage {...messages.alertCopied} />
              </Typography>
            </div>
          )}
        </Paper>
      </Dialog>
    );
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch, ownProps) => ({});

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({});

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ShareDialogComponent));
