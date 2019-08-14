// - Import react components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SvgImage from '@material-ui/icons/Image';
import { withStyles } from '@material-ui/core/styles';

// - Import API

// - Import actions

const styles = theme => ({
  image: {
    verticalAlign: 'top',
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%',
  },
  loadingContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingImage: {
    fill: 'aliceblue',
    width: '50px',
    height: '50px',
  },
});

/**
 * Create component class
 */
export class ImgComponent extends Component {
  styles = {
    loding: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100px',
      position: 'relative',
      color: '#cacecd',
      fontWeight: 400,
    },
  };

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    // Defaul state
    this.state = {
      isImageLoaded: false,
    };

    // Binding functions to `this`
    this.handleLoadImage = this.handleLoadImage.bind(this);
  }

  /**
   * Will be called on loading image
   *
   * @memberof Img
   */
  handleLoadImage = () => {
    this.setState({
      isImageLoaded: true,
    });
  };

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { fileName, style } = this.props;
    const { isImageLoaded } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <img
          className={classes.image}
          onLoad={this.handleLoadImage}
          src={fileName || ''}
          style={isImageLoaded ? style : { display: 'none' }}
          alt="ajhojo"
        />
        <div
          style={Object.assign(
            {},
            { backgroundColor: 'white' },
            isImageLoaded ? { display: 'none' } : this.styles.loding,
          )}
        >
          <div className={classes.loadingContent}>
            <SvgImage className={classes.loadingImage} />
            <div>image.notLoaded</div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Map dispatch to props
 * @return {object}          props of component
 */
const mapDispatchToProps = () => ({});

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = () => ({
  avatarURL: 'URL avater',
  imageRequests: 'image request',
});

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ImgComponent));
