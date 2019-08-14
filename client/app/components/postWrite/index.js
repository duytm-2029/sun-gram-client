// - Import react components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import SvgRemoveImage from '@material-ui/icons/RemoveCircle';
import SvgCamera from '@material-ui/icons/PhotoCamera';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid/Grid';
import { Card, CardHeader, CardContent } from '@material-ui/core';

// - Import app components
import ImageGallery from '../imageGallery';
import Img from '../Img';
import UserAvatarComponent from '../userAvatar';

// - Import API
// import * as PostAPI from 'api/PostAPI'

// - Import actions

const styles = theme => ({
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto',
    },
  },
  backdrop: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: '-1',
    position: 'fixed',
    willChange: 'opacity',
    backgroundColor: 'rgba(251, 249, 249, 0.5)',
    WebkitTapHighlightColor: 'transparent',
  },
  content: {
    padding: 0,
    paddingTop: 0,
  },
  dialogRoot: {
    paddingTop: 0,
  },
  popperOpen: {
    zIndex: 10,
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0,
  },
  author: {
    paddingRight: 70,
  },
  authorSpan: {
    fontSize: '14px',
    paddingRight: '10px',
    fontWeight: 400,
    color: 'rgba(0,0,0,0.87)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    lineHeight: '25px',
  },
  postImageDiv: {
    position: 'relative',
    overflowY: 'hidden',
    overflowX: 'auto',
  },
  postImageWraper: {
    display: 'flex',
    position: 'relative',
  },
  postImageUl: {
    position: 'relative',
    whiteSpace: 'nowrap',
    padding: '0 0 0 16px',
    margin: '8px 0 0 0',
    paddingRight: '16px',
    verticalAlign: 'bottom',
    flexShrink: 0,
    listStyleType: 'none',
  },
  postImageSpan: {
    position: 'absolute',
    width: '28px',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    height: '28px',
    right: 12,
    top: 4,
    cursor: 'pointer',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImageLi: {
    width: '100%',
    margin: 0,
    verticalAlign: 'bottom',
    position: 'static',
  },
  postImageWrapLi: {
    display: 'inline-block',
    width: '100%',
    marginRight: '8px',
    transition: 'transform .25s',
  },
  postImageOnly: {
    width: '100%',
    height: 'auto',
  },
  dialogGridDiv: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
  },
  dialogDivTextField: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    overflowY: 'auto',
    maxHeight: '300px',
  },
  dialogTextFieldOnly: {
    fontWeight: 400,
    fontSize: '14px',
    margin: '0 16px',
    flexShrink: 0,
    width: 'initial',
    flexGrow: 1,
  },
  openGallerly: {
    outline: 'none',
    width: '48px',
    zIndex: 0,
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    transition: 'background .3s',
    border: 0,
    borderRadius: '50%',
    display: 'inlineBlock',
    height: '48px',
  },
  openGallerlySpan: {
    top: '15px',
    display: 'block',
    position: 'relative',
    cursor: 'pointer',
  },
  galleryWraper: {
    flexShrink: 0,
    boxFlex: 0,
    flexGrow: 0,
    maxHeight: '48px',
    width: '100%',
  },
});

// - Create PostWrite component class
export class PostWriteComponent extends Component {
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    const { postModel } = props;
    // Default state
    this.state = {
      /**
       * Post text
       */
      postText: this.props.edit && postModel ? postModel.body : '',
      /**
       * The URL image of the post
       */
      image: this.props.edit && postModel ? postModel.image : '',
      /**
       * The path identifier of image on the server
       */
      imageFullPath:
        this.props.edit && postModel ? postModel.imageFullPath : '',
      /**
       * If it's true gallery will be open
       */
      galleryOpen: false,
      /**
       * Whether menu is open
       */
      menuOpen: false,
      /**
       * Menu anchor element
       */
      menuAnchorEl: null,
      /**
       * If it's true post button will be disabled
       */
      disabledPost: true,
    };

    // Binding functions to `this`
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCloseGallery = this.handleCloseGallery.bind(this);
    this.handleOpenGallery = this.handleOpenGallery.bind(this);
    this.onRequestSetImage = this.onRequestSetImage.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleToggleComments = this.handleToggleComments.bind(this);
    this.handleToggleSharing = this.handleToggleSharing.bind(this);
  }

  /**
   * Toggle comments of the post to disable/enable
   *
   *
   * @memberof PostWrite
   */
  handleToggleComments = () => {};

  /**
   * Toggle sharing of the post to disable/enable
   *
   *
   * @memberof PostWrite
   */
  handleToggleSharing = () => {};

  /**
   * Romove the image of post
   *
   *
   * @memberof PostWrite
   */
  handleRemoveImage = () => {};

  /**
   * Handle send post to the server
   * @param  {event} evt passed by clicking on the post button
   */
  handlePost = () => {};

  /**
   * Handle open more menu
   */
  handleOpenMenu = event => {
    this.setState({
      menuOpen: true,
      menuAnchorEl: event.currentTarget,
    });
  };

  /**
   * Handle close more menu
   */
  handleCloseMenu = () => {
    this.setState({
      menuOpen: false,
      menuAnchorEl: null,
    });
  };

  /**
   * Set post image url
   */
  onRequestSetImage = (url, fullPath) => {
    this.setState({
      image: url,
      imageFullPath: fullPath,
      disabledPost: false,
    });
  };

  /**
   * When the post text changed
   * @param  {event} evt is an event passed by change post text callback funciton
   * @param  {string} data is the post content which user writes
   */
  handleOnChange = event => {
    const data = event.target.value;
    this.setState({ postText: data });
    if (
      data.length === 0 ||
      data.trim() === '' ||
      (this.props.edit && data.trim() === this.props.text)
    ) {
      this.setState({
        postText: data,
        disabledPost: true,
      });
    } else {
      this.setState({
        postText: data,
        disabledPost: false,
      });
    }
  };

  /**
   * Close image gallery
   */
  handleCloseGallery = () => {
    this.setState({
      galleryOpen: false,
    });
  };

  /**
   * Open image gallery
   */
  handleOpenGallery = () => {
    this.setState({
      galleryOpen: true,
    });
  };

  componentWillReceiveProps(nextProps) {}

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes } = this.props;
    const postAvatar = (
      <UserAvatarComponent
        fullName={this.props.ownerDisplayName}
        fileName={this.props.ownerAvatar}
        size={36}
      />
    );

    const author = (
      <div className={classes.author}>
        <span className={classes.authorSpan}>
          {this.props.ownerDisplayName}
        </span>
        <span
          style={{
            fontWeight: 400,
            fontSize: '10px',
          }}
        >
          {' '}
          | post.public
        </span>
      </div>
    );

    /**
     * Provide post image
     */
    const loadImage =
      this.state.image && this.state.image !== '' ? (
        <div>
          <div className={classes.postImageDiv}>
            <ul className={classes.postImageUl}>
              <div className={classes.postImageWraper}>
                <span
                  onClick={this.handleRemoveImage}
                  className={classes.postImageSpan}
                >
                  <SvgRemoveImage style={{ color: 'rgba(0, 0, 0, 0.53)' }} />
                </span>

                <div className={classes.postImageWrapLi}>
                  <li className={classes.postImageLi}>
                    <Img
                      fileName={this.state.image}
                      className={classes.postImageOnly}
                    />
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        ''
      );

    return (
      <div style={this.props.style}>
        {this.props.children}
        <Dialog
          BackdropProps={{ className: classes.backdrop }}
          PaperProps={{ className: classes.fullPageXs }}
          key={this.props.id || 0}
          open={this.props.open}
          onClose={this.props.onRequestClose}
        >
          <DialogContent className={classes.content} style={{ paddingTop: 0 }}>
            <Card elevation={0}>
              <CardHeader
                title={author}
                avatar={postAvatar}
                // action={rightIconMenu}
              />
              <CardContent>
                <Grid item xs={12}>
                  <div className={classes.dialogGridDiv}>
                    <div className={classes.dialogDivTextField}>
                      <TextField
                        autoFocus
                        value={this.state.postText}
                        onChange={this.handleOnChange}
                        placeholder="post.textareaPlaceholder"
                        multiline
                        rows={2}
                        rowsMax={4}
                        className={classes.dialogTextFieldOnly}
                      />

                      {loadImage}
                    </div>
                    <div className={classes.galleryWraper}>
                      <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <div
                          onClick={this.handleOpenGallery}
                          className={classes.openGallerly}
                        >
                          <span className={classes.openGallerlySpan}>
                            <SvgCamera style={{ color: 'grey' }} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              disableFocusRipple
              disableRipple
              onClick={this.props.onRequestClose}
              style={{ color: grey[800] }}
            >
              post.cancelButton
            </Button>
            <Button
              color="primary"
              disableFocusRipple
              disableRipple
              onClick={this.handlePost}
              disabled={this.state.disabledPost}
            >
              {this.props.edit ? 'post.updateButton' : 'post.postButton'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          open={this.state.galleryOpen}
          onClose={this.handleCloseGallery}
        >
          <DialogContent>
            <ImageGallery
              set={this.onRequestSetImage}
              close={this.handleCloseGallery}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              disableFocusRipple
              disableRipple
              onClick={this.handleCloseGallery}
              style={{ color: grey[800] }}
            >
              post.cancelButton
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

/**
 * Map dispatch to props
 */

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = () => {
  const user = {
    avatar: 'https://i.ytimg.com/vi/q2UkUhnEhJg/hqdefault.jpg',
    fullName: 'Tran Manh Duy',
  };
  return {
    ownerAvatar: user.avatar || '',
    ownerDisplayName: user.fullName || '',
  };
};

// - Connect component to redux store
export default connect(mapStateToProps)(withStyles(styles)(PostWriteComponent));
