// - Impoer react components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import SvgAddImage from '@material-ui/icons/AddAPhoto';
import SvgDelete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import uuid from 'uuid';

import messages from './messages';

// - Import APIs
import FileAPI from '../../api/FileAPI';

// - Import actions

// - Import app components
import Img from '../Img';

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
  },
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
  handleSetImage = (event, URL, fullPath) => {
    this.props.set(URL, fullPath);
    this.close();
  };

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
  handleSendResizedImage = event => {
    const { resizedImage, fileName } = event.detail;
    const { uploadImage } = this.props;
    uploadImage(resizedImage, fileName);
  };

  /**
   * Handle on change file upload
   */
  onFileChange = event => {
    const extension = FileAPI.getExtension(event.target.files[0].name);
    const fileName = `${uuid()}.${extension}`;
    const image = FileAPI.constraintImage(event.target.files[0], fileName);
  };

  /**
   * Hide image gallery
   */
  close = () => {
    this.props.close();
  };

  imageList = () =>
    this.props.images.map((image, index) => (
      <GridListTile key={image.id}>
        <div>
          <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
            <ul
              style={{
                whiteSpace: 'nowrap',
                padding: '0 6px',
                margin: '8px 0 0 0',
                verticalAlign: 'bottom',
                flexShrink: 0,
                listStyleType: 'none',
              }}
            >
              <div style={{ display: 'block' }}>
                <div
                  style={{
                    display: 'block',
                    marginRight: '8px',
                    transition: 'transform .25s',
                  }}
                >
                  <li
                    style={{
                      width: '100%',
                      margin: 0,
                      verticalAlign: 'bottom',
                      position: 'static',
                      display: 'inline-block',
                    }}
                  >
                    <Img
                      fileName={image.URL}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <GridListTileBar
          title={
            <SvgDelete
              className={this.props.classes.deleteImage}
              onClick={evt => this.handleDeleteImage(evt, image.id)}
            />
          }
          titlePosition="top"
          actionIcon={
            <SvgAddImage
              className={this.props.classes.addImage}
              onClick={evt =>
                this.handleSetImage(evt, image.URL, image.fullPath)
              }
            />
          }
          actionPosition="left"
        />
      </GridListTile>
    ));

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
            <div className={classes.updaloadImage}>
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
                  <FormattedMessage {...messages.uploadButton} />
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
function mapDispatchToProps(dispatch) {
  return {
    uploadImage: (image, imageName) => dispatch(),
  };
}
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
    images: [
      {
        id: 1,
        URL:
          'https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/evolution-of-thor-5.png',
        fullPath:
          'https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/evolution-of-thor-5.png',
      },
    ],
    avatar: user.fullName || '',
  };
};

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ImageGalleryComponent));
