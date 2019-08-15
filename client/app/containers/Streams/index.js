// - Import react components
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { grey } from '@material-ui/core/colors';
import SvgCamera from '@material-ui/icons/PhotoCamera';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InfiniteScroll from 'react-infinite-scroller';

// - Import app components
import PostComponent from '../../components/Posts';
import PostWriteComponent from '../../components/postWrite';
import UserAvatarComponent from '../../components/userAvatar';
import LoadMoreProgressComponent from '../../layouts/loadMoreProgress';

// - Import API
import * as PostAPI from '../../api/PostAPI';
// - Import actions

// import { Post } from 'src/core/domain/posts';

// - Create StreamComponent component class
export class StreamComponent extends Component {
  styles = {
    postWritePrimaryText: {
      color: grey[400],
      cursor: 'text',
    },
    postWtireItem: {
      fontWeight: '200',
    },
  };

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    this.state = {
      /**
       * If it's true, post write will be open
       */
      openPostWrite: false,
    };

    // Binding functions to `this`
    this.postLoad = this.postLoad.bind(this);
    this.handleOpenPostWrite = this.handleOpenPostWrite.bind(this);
    this.handleClosePostWrite = this.handleClosePostWrite.bind(this);
  }

  /**
   * Open post write
   *
   *
   * @memberof StreamComponent
   */
  handleOpenPostWrite = () => {
    this.setState({
      openPostWrite: true,
    });
  };

  /**
   * Close post write
   *
   *
   * @memberof StreamComponent
   */
  handleClosePostWrite = () => {
    this.setState({
      openPostWrite: false,
    });
  };

  /**
   * Create a list of posts
   * @return {DOM} posts
   */
  postLoad = () => {
    const { posts } = this.props;
    if (posts === undefined || !Object.keys(posts).length > 0) {
      return <h1>Nothing has shared.</h1>;
    }
    const postBack = { oddPostList: [], evenPostList: [] };
    const parsedPosts = [];
    Object.keys(posts).forEach(postId => {
      parsedPosts.push({ ...posts[postId] });
    });
    const sortedPosts = PostAPI.sortObjectsDate(parsedPosts);

    if (sortedPosts.length > 6) {
      postBack.divided = true;
    } else {
      postBack.divided = false;
    }
    let index = 0;
    sortedPosts.forEach(post => {
      const newPost = (
        <div key={`${post.id}-stream-div`}>
          {index > 1 || (!postBack.divided && index > 0) ? (
            <div style={{ height: '16px' }} />
          ) : (
            ''
          )}
          <PostComponent
            key={`${post.id}-stream-div-post`}
            post={post}
          />
        </div>
      );

      if (index % 2 === 1 && postBack.divided) {
        postBack.oddPostList.push(newPost);
      } else {
        postBack.evenPostList.push(newPost);
      }
      index += 1;
    });
    return postBack;
  };

  /**
   * Scroll loader
   */
  scrollLoad = page => {
    // handle scroll load in here
  };

  componentWillMount() {
    // this handler for componentWillMount
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { displayWriting, hasMorePosts, translate } = this.props;
    const postList = this.postLoad();
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.scrollLoad}
        hasMore={hasMorePosts}
        useWindow
        loader={<LoadMoreProgressComponent key="stream-load-more-progress" />}
      >
        <div className="grid grid__gutters grid__1of2 grid__space-around animate-top">
          <div
            className="grid-cell animate-top"
            style={{ maxWidth: '530px', minWidth: '280px' }}
          >
            {displayWriting ? (
              <PostWriteComponent
                open={this.state.openPostWrite}
                onRequestClose={this.handleClosePostWrite}
                edit={false}
              >
                <Paper elevation={2}>
                  <ListItem
                    button
                    style={this.styles.postWtireItem}
                    onClick={this.handleOpenPostWrite}
                  >
                    <UserAvatarComponent
                      fullName={this.props.fullName}
                      fileName={this.props.avatar}
                      size={36}
                    />
                    <ListItemText
                      inset
                      primary={
                        <span style={this.styles.postWritePrimaryText}>
                          What's on your mind?
                        </span>
                      }
                    />
                    <ListItemIcon>
                      <SvgCamera />
                    </ListItemIcon>
                  </ListItem>
                </Paper>
                <div style={{ height: '16px' }} />
              </PostWriteComponent>
            ) : (
              ''
            )}

            {postList.evenPostList}
            <div style={{ height: '16px' }} />
          </div>
          {postList.divided ? (
            <div
              className="grid-cell animate-top"
              style={{ maxWidth: '530px', minWidth: '280px' }}
            >
              <div className="blog__right-list">
                {postList.oddPostList}
                <div style={{ height: '16px' }} />
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </InfiniteScroll>
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
    avatar: user ? user.avatar : '',
    fullName: user ? user.fullName : '',
  };
};

// - Connect component to redux store
export default withRouter(connect(mapStateToProps)(StreamComponent));
