// - Import react components
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';

// - Import app components

// - Import API

// - Import actions

/**
 * Create component class
 */
export class UserAvatarComponent extends Component {
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
    const { fileName, fullName, style, size, onClick } = this.props;
    return (
      <div style={{ display: 'inherit' }}>
        {fileName && fileName !== '' && fileName !== 'noImage' ? (
          <Avatar
            src={fileName || ' '}
            style={{
              ...style,
              backgroundColor: '#ffffff',
              width: size || 36,
              height: size || 36,
            }}
            onClick={onClick}
          />
        ) : (
          <Avatar
            style={{
              ...style,
              backgroundColor: '#00bcd4',
              width: size || 36,
              height: size || 36,
            }}
            onClick={onClick}
          >
            {fullName ? fullName.slice(0, 1) : ''}
          </Avatar>
        )}
      </div>
    );
  }
}

// - Connect component to redux store
export default UserAvatarComponent;
