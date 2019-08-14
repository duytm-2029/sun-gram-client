// - Import react components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// - Material UI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

// - Import app components
import * as PostAPI from '../../api/PostAPI';
import CommentComponent from '../Comment';


// - Import actions

const styles = theme => ({
  list: {
    width: '100%',
    maxHeight: 290,
    overflowY: 'auto',
    overflowX: 'visible',
  },
});

/**
 * Create component class
 */
export class CommentListComponent extends Component {
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    /**
     * Default state
     */
    this.state = {};

    // Binding functions to `this`
  }

  /**
   * Get comments' DOM
   * @return {DOM} list of comments' DOM
   */
  commentList = () => {
    const { comments } = this.props;
    const { commentsEditorStatus } = this.props;
    if (!_.isEmpty(comments)) {
      const parsedComments = [];
      comments.forEach((comment, commentId) => {
        parsedComments.push({
          id: commentId,
          ...comment,
        });
      });
      const sortedComments = PostAPI.sortObjectsDate(parsedComments);

      return sortedComments.map((comment, index, array) => (
        <CommentComponent
          key={comment.id}
          comment={comment}
          isPostOwner={this.props.isPostOwner}
          editorStatus={false}
        />
      ));
    }
  };

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes, postId } = this.props;

    return (
      <List key={`comment-list-${postId}`} className={classes.list}>
        {this.commentList()}
      </List>
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
  const commentsEditorStatus = false;
  return {
    commentsEditorStatus,
  };
};

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentListComponent));
