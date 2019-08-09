// - Import react components
import React, { Component } from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { teal } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import classNames from 'classnames';

// - Import actions

// - Import app components
// import CommentListComponent from 'components/commentList';
import UserAvatar from './userAvatar';

// import { Comment } from 'core/domain/comments';
// import { ServerRequestModel } from 'models/server';
// import StringAPI from 'api/StringAPI';
// import { ServerRequestType } from 'constants/serverRequestType';
// import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
// import { Profile } from 'core/domain/users';
// import { ICommentGroupComponentState } from './ICommentGroupComponentState';
// import { ICommentGroupComponentProps } from './ICommentGroupComponentProps';

const styles = theme => ({
  textField: {
    fontWeight: 400,
    fontSize: '14px',
  },
  header: {
    padding: '2px 3px 3px 10px',
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
  author: {
    fontSize: '10px',
    paddingRight: '10px',
    fontWeight: 400,
    color: 'rgba(0,0,0,0.87)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  noUnderline: {
    display: 'none',
  },
  postButton: {
    flexDirection: 'row-reverse',
  },
});

/**
 * Create component class
 */
export class CommentGroupComponent extends Component {
  styles = {
    commentItem: {
      height: '60px',
      position: '',
      zIndex: '',
    },
    toggleShowList: {
      height: '60px',
      zIndex: 5,
    },
    writeCommentTextField: {
      width: '100%',
      fontWeight: 400,
      fontSize: '14px',
    },
    progressbar: {
      height: '1.5px',
      backgroundColor: 'rgb(245, 243, 243)',
      color: teal.A400,
    },
    secondaryText: {
      fontSize: '13px',
      lineHeight: '20px',
      color: 'rgba(0,0,0,0.87)',
      fontWeight: 300,
      whiteSpace: 'pre-wrap',
    },
    primaryText: {
      fontSize: '13px',
      paddingRight: '10px',
      fontWeight: 400,
      color: 'rgba(0,0,0,0.87)',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  };

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    /**
     * Defaul state
     */
    this.state = {
      commentText: '',
      postDisable: true,
    };

    // Binding functions to `this`
    this.commentList = this.commentList.bind(this);
    this.handlePostComment = this.handlePostComment.bind(this);
    this.clearCommentWrite = this.clearCommentWrite.bind(this);
  }

  /**
   * Clear comment text field
   */
  clearCommentWrite = () => {
    this.setState({
      commentText: '',
      postDisable: true,
    });
  };

  /**
   * Post comment
   */
  handlePostComment = () => {};

  /**
   * When comment text changed
   * @param  {event} evt is an event passed by change comment text callback funciton
   * @param  {string} data is the comment text which user writes
   */
  handleChange = event => {
    const data = event.target.value;
    this.setState({ commentText: data });
    if (data.length === 0 || data.trim() === '') {
      this.setState({
        commentText: '',
        postDisable: true,
      });
    } else {
      this.setState({
        commentText: data,
        postDisable: false,
      });
    }
  };

  /**
   * Get comments' DOM
   * @return {DOM} list of comments' DOM
   */
  commentList = () => {
    const { classes, postId } = this.props;
    let comments = this.props.commentSlides;
    if (comments) {
      comments = _.fromPairs(
        _.toPairs(comments).sort(
          (a, b) =>
            parseInt(b[1].creationDate, 10) - parseInt(a[1].creationDate, 10),
        ),
      );
      const parsedComments = [];
      Object.keys(comments).forEach(commentId => {
        parsedComments.push({
          id: commentId,
          ...comments[commentId],
        });
      });
      if (parsedComments.length === 2) {
        parsedComments.push(parsedComments[0]);
      } else if (parsedComments.length === 1) {
        parsedComments.push(parsedComments[0]);
        parsedComments.push(parsedComments[0]);
      }
      return parsedComments.map((comment, index) => {
        const commentAvatar = comment.userAvatar;
        const commentFullName = comment.userDisplayName;

        const commentBody = (
          <div style={{ outline: 'none', flex: 'auto', flexGrow: 1 }}>
            <div className={classNames('animate2-top10', classes.commentBody)}>
              {comment.text}
            </div>
          </div>
        );

        const Author = () => (
          <div>
            <NavLink to={`/${comment.userId}`}>
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
        return (
          <Paper
            key={`${comment.id}-index:${index}`}
            elevation={0}
            className="animate2-top10"
          >
            <Card elevation={0}>
              <CardHeader
                className={classes.header}
                title={<Author />}
                avatar={
                  <UserAvatar
                    fullName={commentFullName}
                    fileName={commentAvatar}
                    size={24}
                  />
                }
                subheader={commentBody}
              />
            </Card>
          </Paper>
        );
      });
    }
    return null;
  };

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const {
      classes,
      postId,
      fullName,
      avatar,
      commentsRequestStatus,
      open,
      commentSlides,
      translate,
    } = this.props;
    const { comments } = this.props;
    /**
     * Comment list box
     */
    const commentWriteBox = (
      <div>
        <Divider />
        <Paper
          key={`${postId}-commentwrite`}
          elevation={0}
          className="animate2-top10"
        >
          <Card elevation={0}>
            <CardHeader
              className={classes.header}
              avatar={
                <UserAvatar fullName={fullName} fileName={avatar} size={24} />
              }
              subheader={
                <TextField
                  autoFocus
                  placeholder="comment.addCommentPlaceholder"
                  multiline
                  rowsMax="4"
                  InputProps={{
                    disableUnderline: true,
                    autoFocus: true,
                    fullWidth: true,
                  }}
                  value={this.state.commentText}
                  onChange={this.handleChange}
                  className={classes.textField}
                  fullWidth
                />
              }
            />
            <CardActions className={classes.postButton}>
              <Button
                color="primary"
                disabled={this.state.postDisable}
                onClick={this.handlePostComment}
              >
                comment.postButton
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </div>
    );

    const sshowComments = !comments.isEmpty() ? (
      <Paper
        elevation={0}
        style={
          open
            ? { display: 'block', padding: '0px 0px' }
            : { display: 'none', padding: '12px 16px' }
        }
      />
    ) : (
      ''
    );
    const loadComments =
      commentsRequestStatus === 'OK' || !comments.isEmpty() ? (
        sshowComments
      ) : (
        <LinearProgress
          style={this.styles.progressbar}
          variant="indeterminate"
        />
      );
    /**
     * Return Elements
     */
    return (
      <div key={`${postId}-comments-group`}>
        <Divider />
        <div
          style={
            commentSlides && !commentSlides.isEmpty()
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          <Paper
            elevation={0}
            className="animate-top"
            style={!open ? { display: 'block' } : { display: 'none' }}
          >
            <div style={{ position: 'relative', height: '60px' }}>
              <Button
                style={this.styles.toggleShowList}
                fullWidth
                onClick={this.props.onToggleRequest}
              >
                {' '}
              </Button>

              <div className="comment__list-show">{this.commentList()}</div>
            </div>
          </Paper>
        </div>
        {open ? loadComments : ''}
        {!this.props.disableComments && open ? commentWriteBox : ''}
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
  const user = {
    avatar:
      'https://www.verywellhealth.com/thmb/8cp_3dZRJay8AZ9X2lRmOLZ-C9k=/1500x1000/filters:fill(87E3EF,1)/What-are-the-three-levels-of-autism-260233-5b9f12fac9e77c0050171771.png',
    fullName: 'guest',
    info: {},
  };
  return {
    commentsRequestStatus: 'OK',
    avatar: user ? user.avatar : '',
    fullName: user ? user.fullName : '',
    userInfo: user.info,
  };
};

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentGroupComponent));
