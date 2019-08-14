// - Import react components
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import Popover from '@material-ui/core/Popover';

// - Import material UI libraries
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import classNames from 'classnames';

// - Import app components
import UserAvatar from '../userAvatar';

// - Import message
import messages from './messages';

// - Import API

// - Import actions

const styles = theme => ({
  textField: {
    fontWeight: 400,
    fontSize: '14px',
  },
  header: {
    padding: '2px 3px 3px 10px',
  },
  popperOpen: {
    zIndex: 11,
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0,
  },
  iconButton: {
    top: 0,
    display: 'flex',
    right: 4,
    flexDirection: 'row-reverse',
    position: 'absolute',
  },
  commentBody: {
    color: 'black',
    fontWeight: 400,
    fontSize: '12px',
    height: '100%',
    border: 'none',
    width: '100%',
    outline: 'none',
    resize: 'none',
  },
  rightIconMenuItem: {
    fontSize: 12,
    fontWeight: 300,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 0,
    paddingBottom: 0,
  },
  moreIcon: {
    width: '0.6em',
    height: '0.6em',
  },
  author: {
    fontSize: '10px',
    paddingRight: '10px',
    fontWeight: 400,
    color: 'rgba(0,0,0,0.87)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  textarea: {
    fontWeight: 400,
    fontSize: '14px',
    border: 'none',
    width: '100%',
    outline: 'none',
    resize: 'none',
  },
  cancel: {
    float: 'right',
    clear: 'both',
    zIndex: 5,
    margin: '0px 5px 5px 0px',
    fontWeight: 400,
  },
});

/**
 * Create component class
 */
export class CommentComponent extends Component {
  /**
   * Fields
   */
  buttonMenu = null;

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    // Defaul state
    this.state = {
      /**
       * Comment text
       */
      text: this.props.comment.text,
      /**
       * Comment text to match edit with new comment that is edited
       */
      initialText: this.props.comment.text,
      /**
       * If comment text dosn't take any change it will be true
       */
      editDisabled: true,
      /**
       * If it's true the post owner is the logged in user which this post be long to the comment
       */
      isPostOwner: false,
      /**
       * The anchor of comment menu element
       */
      openMenu: false,
      /**
       * Anchor element
       */
      anchorEl: null,
    };

    // Binding functions to `this`
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
  }

  /**
   * Handle show edit comment
   * @param  {event} evt is an event passed by clicking on edit button
   */
  handleEditComment = evt => {};

  /**
   * Handle cancel edit
   * @param  {event} evt is an event passed by clicking on cancel button
   */
  handleCancelEdit = evt => {};

  /**
   * Handle edit comment
   * @param  {event} evt is an event passed by clicking on post button
   */
  handleUpdateComment = evt => {};

  /**
   * When comment text changed
   * @param  {event} evt is an event passed by change comment text callback funciton
   * @param  {string} data is the comment text which user writes
   */
  handleOnChange = evt => {};

  /**
   * Delete a comment
   * @param  {event} evt    an event passed by click on delete comment
   * @param  {string} id     comment identifire
   * @param  {string} postId post identifier which comment belong to
   */
  handleDelete = (evt, id, postId) => {};

  /**
   * Handle comment menu
   */
  handleCommentMenu = event => {
    this.setState({ openMenu: true, anchorEl: findDOMNode(this.buttonMenu) });
  };

  /**
   * Handle close request for comment menu
   */
  handleCloseCommentMenu = () => {
    this.setState({ openMenu: false });
  };

  componentWillMount() {}

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    /**
     * Comment object from props
     */
    const {
      comment,
      classes,
      fullName,
      avatar,
      editorStatus,
      goTo,
      setHomeTitle,
    } = this.props;

    const { openMenu, anchorEl } = this.state;

    const rightIconMenu = (
      <div>
        <IconButton
          buttonRef={node => {
            this.buttonMenu = node;
          }}
          aria-owns={openMenu ? 'comment-menu' : ''}
          aria-haspopup="true"
          onClick={this.handleCommentMenu}
        >
          <MoreVertIcon className={classes.moreIcon} />
        </IconButton>
        <Popover
          open={openMenu}
          anchorEl={anchorEl}
          anchorReference="anchorEl"
          anchorPosition={{ top: 0, left: 0 }}
          onClose={this.handleCloseCommentMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Paper>
            <MenuList role="menu">
              <MenuItem className={classes.rightIconMenuItem}>
                <FormattedMessage {...messages.replyButon} />
              </MenuItem>
              {this.props.isCommentOwner ? (
                <MenuItem
                  className={classes.rightIconMenuItem}
                  onClick={this.handleEditComment}
                >
                  <FormattedMessage {...messages.editButton} />
                </MenuItem>
              ) : (
                ''
              )}
              {this.props.isCommentOwner || this.props.isPostOwner ? (
                <MenuItem
                  className={classes.rightIconMenuItem}
                  onClick={evt =>
                    this.handleDelete(evt, comment.id, comment.postId)
                  }
                >
                  <FormattedMessage {...messages.deleteButton} />
                </MenuItem>
              ) : (
                ''
              )}
            </MenuList>
          </Paper>
        </Popover>
      </div>
    );

    const Author = () => (
      <div>
        <NavLink to={`/${userId}`}>
          {' '}
          <span className={classes.author}>{comment.userDisplayName}</span>
        </NavLink>
        <span
          style={{
            fontWeight: 400,
            fontSize: '8px',
          }}
        >
          {moment.unix(comment.creationDate).fromNow()}
        </span>
      </div>
    );
    const { userId } = comment;
    const commentBody = (
      <div style={{ outline: 'none', flex: 'auto', flexGrow: 1 }}>
        {editorStatus ? (
          <TextField
            placeholder="updateCommentPlaceholder"
            multiline
            autoFocus
            rowsMax="4"
            InputProps={{
              disableUnderline: true,
              autoFocus: true,
              fullWidth: true,
            }}
            value={this.state.text}
            onChange={this.handleOnChange}
            className={classes.textField}
            fullWidth
          />
        ) : (
          <div className={classNames('animate2-top10', classes.commentBody)}>
            {this.state.text}
          </div>
        )}

        <div
          style={{
            display: editorStatus ? 'flex' : 'none',
            flexDirection: 'row-reverse',
          }}
        >
          <Button
            color="primary"
            disabled={this.state.editDisabled}
            style={{
              float: 'right',
              clear: 'both',
              zIndex: 5,
              margin: '0px 5px 5px 0px',
              fontWeight: 400,
            }}
            onClick={this.handleUpdateComment}
          >
            {' '}
            updateButton{' '}
          </Button>
          <Button
            color="primary"
            className={classes.cancel}
            onClick={this.handleCancelEdit}
          >
            {' '}
            cancelButton{' '}
          </Button>
        </div>
      </div>
    );
    return (
      <div className="animate-top" key={comment.id}>
        <Paper
          elevation={0}
          className="animate2-top10"
          style={{
            position: 'relative',
            padding: '',
            display: !this.state.display ? 'block' : 'none',
          }}
        >
          <Card elevation={0}>
            <CardHeader
              className={classes.header}
              title={editorStatus ? '' : <Author />}
              subheader={commentBody}
              avatar={
                <NavLink to={`/${userId}`}>
                  <UserAvatar fullName={fullName} fileName={avatar} size={24} />
                </NavLink>
              }
              action={
                (!this.props.isCommentOwner && !this.props.isPostOwner) ||
                editorStatus
                  ? ''
                  : rightIconMenu
              }
            />
          </Card>
        </Paper>
      </div>
    );
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch, ownProps) => ({});

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
  const commentOwnerId = ownProps.comment.userId;
  const uid = 'uuid-231-adasd';
  const avatar = ownProps.comment.userAvatar;
  const fullName = ownProps.comment.userDisplayName;
  return {
    uid,
    isCommentOwner: true,
    commentOwner: true,
    avatar,
    fullName,
  };
};

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentComponent));
