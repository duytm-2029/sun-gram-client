// - Import react components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import copy from 'copy-to-clipboard';

// - Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import SvgShare from '@material-ui/icons/Share';
import SvgComment from '@material-ui/icons/Comment';
import SvgFavorite from '@material-ui/icons/Favorite';
import SvgFavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

// - Import app components
import CommentGroup from '../commentGroup';
import ShareDialog from '../shareDialog';
import PostWrite from '../postWrite';
import Img from '../Img';
import UserAvatar from '../userAvatar';

// - Import actions

const styles = theme => ({
  iconButton: {
    marginLeft: 5,
  },
  vote: {
    display: 'flex',
    flex: 1,
  },
  voteCounter: {
    color: 'rgb(134, 129, 129)',
    fontSize: 10,
    fontWeight: 400,
    padding: 2,
    zIndex: 1,
  },
  commentCounter: {
    color: 'rgb(134, 129, 129)',
    fontSize: 10,
    fontWeight: 400,
    padding: 4,
  },
  popperOpen: {
    zIndex: 10,
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0,
  },
  postBody: {
    wordWrap: 'break-word',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
  },
  image: {
    width: '100%',
    height: 500,
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

// - Create component class
export class PostComponent extends Component {
  styles = {
    dialog: {
      width: '',
      maxWidth: '530px',
      borderRadius: '4px',
    },
  };

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);
    const { post } = props;
    this.state = {
      /**
       * Post text
       */
      text: post.body,
      /**
       * It's true if whole the text post is visible
       */
      readMoreState: false,
      /**
       * Handle open comment from parent component
       */
      openComments: false,
      /**
       * If it's true, share dialog will be open
       */
      shareOpen: false,
      /**
       * Title of share post
       */
      shareTitle: 'Share On',
      /**
       * If it's true, post link will be visible in share post dialog
       */
      openCopyLink: false,
      /**
       * If it's true, post write will be open
       */
      openPostWrite: false,
      /**
       * Post menu anchor element
       */
      postMenuAnchorEl: null,
      /**
       * Whether post menu open
       */
      isPostMenuOpen: false,
    };

    // Binding functions to this
    this.handleReadMore = this.handleReadMore.bind(this);
    this.getOpenCommentGroup = this.getOpenCommentGroup.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleOpenShare = this.handleOpenShare.bind(this);
    this.handleCloseShare = this.handleCloseShare.bind(this);
    this.handleCopyLink = this.handleCopyLink.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenPostWrite = this.handleOpenPostWrite.bind(this);
    this.handleClosePostWrite = this.handleClosePostWrite.bind(this);
    this.handleOpenComments = this.handleOpenComments.bind(this);
  }

  /**
   * Toggle on show/hide comment
   */
  handleOpenComments = () => {
    this.setState({
      openComments: !this.state.openComments,
    });
  };

  /**
   * Open post write
   *
   */
  handleOpenPostWrite = () => {
    this.setState({
      openPostWrite: true,
    });
  };

  /**
   * Close post write
   *
   */
  handleClosePostWrite = () => {
    this.setState({
      openPostWrite: false,
    });
  };

  /**
   * Delete a post
   *
   */
  handleDelete = () => {};

  /**
   * Open post menu
   */
  openPostMenu = event => {
    this.setState({
      postMenuAnchorEl: event.currentTarget,
      isPostMenuOpen: true,
    });
  };

  /**
   * Close post menu
   */
  closePostMenu = event => {
    this.setState({
      postMenuAnchorEl: event.currentTarget,
      isPostMenuOpen: false,
    });
  };

  /**
   * Show copy link
   *
   */
  handleCopyLink = () => {
    this.setState({
      openCopyLink: true,
      shareTitle: 'Copy link',
    });
  };

  /**
   * Open share post
   *
   */
  handleOpenShare = () => {
    const { post } = this.props;
    copy(`${location.origin}/${post.ownerUserId}/posts/${post.id}`);
    this.setState({
      shareOpen: true,
    });
  };

  /**
   * Close share post
   *
   */
  handleCloseShare = () => {
    this.setState({
      shareOpen: false,
      openCopyLink: false,
      shareTitle: 'Share On',
    });
  };

  /**
   * Handle vote on a post
   *
   */
  handleVote = () => {
    if (this.props.currentUserVote) {
      // handle unvote
    } else {
      // handle vote
    }
  };

  /**
   * Set open comment group function on state which passed by CommentGroup component
   * @param  {function} open the function to open comment list
   */
  getOpenCommentGroup = open => {
    this.setState({
      openCommentGroup: open,
    });
  };

  /**
   * Handle read more event
   * @param  {event} evt  is the event passed by click on read more
   */
  handleReadMore(event) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /**
   * Reneder component DOM
   */
  render() {
    const {
      post,
      setHomeTitle,
      fullName,
      isPostOwner,
      commentList,
      classes,
    } = this.props;
    const { postMenuAnchorEl, isPostMenuOpen } = this.state;
    const rightIconMenu = (
      <div>
        <IconButton onClick={this.openPostMenu}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          open={isPostMenuOpen}
          anchorEl={postMenuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={this.closePostMenu}
        >
          <MenuItem onClick={this.handleOpenPostWrite}> post.edit </MenuItem>
          <MenuItem onClick={this.handleDelete}> post.delete </MenuItem>
        </Menu>
      </div>
    );

    const {
      ownerUserId,
      ownerDisplayName,
      creationDate,
      image,
      body,
      id,
      commentCounter,
    } = post;
    // Define variables
    return (
      <Card key={`post-component-${id}`}>
        <CardHeader
          title={
            <NavLink to={`/${ownerUserId}`}>{post.ownerDisplayName}</NavLink>
          }
          subheader={
            creationDate ? (
              `${moment.unix(creationDate).fromNow()} |  post.public`
            ) : (
              <LinearProgress color="primary" />
            )
          }
          avatar={
            <NavLink to={`/${ownerUserId}`}>
              <UserAvatar
                fullName={post.ownerDisplayName}
                fileName={post.ownerAvatar}
                size={36}
              />
            </NavLink>
          }
          action={isPostOwner ? rightIconMenu : ''}
        />
        {image ? (
          <CardMedia image={image}>
            <Img fileName={image} />
          </CardMedia>
        ) : (
          ''
        )}

        <CardContent className={classes.postBody}>{body}</CardContent>
        <CardActions>
          <div className={classes.vote}>
            <IconButton
              className={classes.iconButton}
              onClick={this.handleVote}
              style={{ padding: '0px', marginLeft: '0px' }}
              aria-label="Love"
            >
              <Checkbox
                className={classes.iconButton}
                checkedIcon={<SvgFavorite style={{ fill: '#4CAF50' }} />}
                icon={<SvgFavoriteBorder style={{ fill: '#757575' }} />}
                checked={this.props.currentUserVote}
              />
              <div className={classes.voteCounter}>
                {' '}
                {this.props.voteCount > 0 ? this.props.voteCount : ''}{' '}
              </div>
            </IconButton>
          </div>

          <div style={{ display: 'inherit' }}>
            <IconButton
              className={classes.iconButton}
              onClick={this.handleOpenComments}
              aria-label="Comment"
            >
              <SvgComment />
              <div className={classes.commentCounter}>
                {commentCounter > 0 ? commentCounter : ''}{' '}
              </div>
            </IconButton>
          </div>
          <IconButton
            className={classes.iconButton}
            onClick={this.handleOpenShare}
            aria-label="Comment"
          >
            <SvgShare />
          </IconButton>
        </CardActions>

        <CommentGroup
          open={this.state.openComments}
          comments={commentList}
          ownerPostUserId={ownerUserId}
          onToggleRequest={this.handleOpenComments}
          isPostOwner={this.props.isPostOwner}
          postId={id}
        />

        <ShareDialog
          onClose={this.handleCloseShare}
          shareOpen={this.state.shareOpen}
          onCopyLink={this.handleCopyLink}
          openCopyLink={this.state.openCopyLink}
          post={post}
        />

        <PostWrite
          open={this.state.openPostWrite}
          onRequestClose={this.handleClosePostWrite}
          edit
          postModel={post}
        />
      </Card>
    );
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch, ownProps) => {};

/**
 * Map state to props
 */
const mapStateToProps = () => {
  const user = {
    avatar:
      'https://sohanews.sohacdn.com/thumb_w/660/2018/11/12/1218phuong-oanh-pttm-06-15420417906571266351224-crop-15421211405941795204364.jpg',
    fullName: ' phuong oanh',
  };
  const currentUserVote = true;
  const voteCount = 10;
  const commentList = [
    {
      text: 'this is comment 1',
      userAvatar: 'urlavatar1',
      userDisplayName: 'user display name 1',
      userId: 'user id 1',
      creationDate: 1565631211,
    },
    {
      text: 'this is comment 2',
      userAvatar: 'urlavatar2',
      userDisplayName: 'user display name 2',
      userId: 'user id 2',
      creationDate: 1565631291,
    },
    {
      text: 'this is comment 3',
      userAvatar: 'urlavatar3',
      userDisplayName: 'user display name 3',
      userId: 'user id 3',
      creationDate: 1565631209,
    },
  ];
  return {
    commentList,
    avatar: user ? user.avatar : '',
    fullName: user ? user.fullName : '',
    voteCount,
    currentUserVote,
    isPostOwner: true,
  };
};

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostComponent));
