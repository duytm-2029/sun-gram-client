// - Impoer react components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// - Import actions

// - Import app components

const styles = theme => ({
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto',
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
  uploadButton: {
    verticalAlign: 'middle',
    fontWeight: 400,
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  deleteImage: {
    marginLeft: '5px',
    cursor: 'pointer',
    color: 'white',
  },
  addImage: {
    marginRight: '5px',
    cursor: 'pointer',
    color: 'white',
  },
  updaloadImage: {
    display: 'flex',
    backgroundColor: 'rgba(222, 222, 222, 0.52)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
});

/**
 * Create ImageGallery component class
 */
export class ImageGalleryComponent extends Component {
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    // Binding function to `this`
    this.close = this.close.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSetImage = this.handleSetImage.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
    this.imageList = this.imageList.bind(this);
  }

  /**
   * Handle set image
   * @param  {event} evt  passed by on click event on add image
   * @param  {string} name is the name of the image
   */
  handleSetImage = (event, URL, fullPath) => {};

  /**
   * Handle delete image
   * @param  {event} evt  passed by on click event on delete image
   * @param  {integer} id is the image identifier which selected to delete
   */
  handleDeleteImage = (event, id) => {};

  componentDidMount() {
    window.addEventListener('onSendResizedImage', this.handleSendResizedImage);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'onSendResizedImage',
      this.handleSendResizedImage,
    );
  }

  /**
   * Handle send image resize event that pass the resized image
   *
   *
   * @memberof ImageGallery
   */
  handleSendResizedImage = event => {};

  /**
   * Handle on change file upload
   */
  onFileChange = event => {};

  /**
   * Hide image gallery
   */
  close = () => {};

  imageList = () => {
    // hander image list
  };

  render() {
    /**
     * Component styles
     * @type {Object}
     */
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="upload-image-gallery">
            <div
              className={classes.updaloadImage}
            >
              <input
                accept="image/*"
                className={classes.uploadInput}
                id="raised-button-file"
                onChange={this.onFileChange}
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.uploadButton}
                >
                  {'imageGallery.uploadButton'}
                </Button>
              </label>
            </div>
          </GridListTile>
          {this.imageList()}
        </GridList>
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
    images: user.avatar || '',
    avatar: user.fullName || '',
  };
};

// - Connect component to redux store
export default connect(mapStateToProps)(
  withStyles(styles)(ImageGalleryComponent),
);
