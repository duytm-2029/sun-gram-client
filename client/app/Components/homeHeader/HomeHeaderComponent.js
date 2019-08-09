// - Import react components
import React, { Component } from 'react';
import classNames from 'classnames';
// - Material UI
import SvgDehaze from '@material-ui/icons/Dehaze';
import { blue } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Hidden from '@material-ui/core/Hidden';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// - Import components
import UserAvatarComponent from '../userAvatar';
import Notify from '../notify';

import config from '../../config';

const styles = {
  root: {
    backgroundColor: '#a5792a',
  },
  flex: {
    flex: 1,
  },
};

export class HomeHeaderComponent extends Component {
  styles = {
    avatarStyle: {
      margin: 5,
      cursor: 'pointer',
    },
  };

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      /**
       * User avatar popover is open if true
       */
      openAvatarMenu: false,
      /**
       * Show header title or not (true/false)
       */
      showTitle: true,
      /**
       * If true notification menu will be open
       */
      openNotifyMenu: false,
    };

    // Binding functions to `this`
    this.onToggleSidebar = this.onToggleSidebar.bind(this);
    this.handleCloseNotify = this.handleCloseNotify.bind(this);
  }

  /**
   * Handle close notification menu
   *
   */
  handleCloseNotify = () => {
    this.setState({
      openNotifyMenu: false,
    });
  };

  // On click toggle sidebar
  onToggleSidebar = () => {
    const { onToggleDrawer } = this.props;
    onToggleDrawer();
  };

  /**
   * Handle notification touch
   *
   */
  handleNotifyTouchTap = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openNotifyMenu: true,
      anchorEl: event.currentTarget,
    });
  };

  /**
   * Handle touch on user avatar for popover
   *
   */
  handleAvatarTouchTap = event => {
    this.setState({
      openAvatarMenu: true,
      anchorEl: event.currentTarget,
    });
  };

  /**
   * Handle logout user
   *
   */
  handleLogout = () =>
    // need to implement
    null;

  /**
   * Handle close popover
   *
   */
  handleRequestClose = () => {
    this.setState({
      openAvatarMenu: false,
      anchorEl: null,
    });
  };

  /**
   * Handle resize event for window to manipulate home header status
   * @param  {event} evt is the event is passed by winodw resize event
   */
  handleResize = event => {
    const { drawerStatus } = this.props;
    // Set initial state
    const width = window.innerWidth;

    if (width >= 600 && !drawerStatus) {
      this.onToggleSidebar();
    } else if (width < 600) {
      console.log(width);
    }
  };

  componentDidMount() {
    this.handleResize(null);
  }

  // Render app DOM component
  render() {
    const { classes, theme } = this.props;
    const anchor = theme.direction === 'rtl' ? 'right' : 'left';
    return (
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          {/* Left side */}

          <IconButton onClick={this.onToggleSidebar}>
            <SvgDehaze color="primary" style={{ cursor: 'pointer' }} />
          </IconButton>
          {/* Header title */}
          <Typography
            variant="h6"
            color="primary"
            style={{ marginLeft: '15px' }}
          >
            {config.settings.appName}
          </Typography>
          <div className="homeHeader__title-root">
            <Hidden smDown>
              <div
                className={classNames({
                  'homeHeader__title-left': anchor === 'left',
                  'homeHeader__title-right': anchor === 'right',
                })}
              >
                Home
              </div>
            </Hidden>
          </div>

          {/* Notification */}
          <div className="homeHeader__right">
            {'this.props.notifyCount' > 0 ? (
              <Tooltip title="header.notificationTooltip">
                <IconButton onClick={this.handleNotifyTouchTap}>
                  <div className="homeHeader__notify">
                    <div className="title">notifyCount</div>
                  </div>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="header.notificationTooltip">
                <IconButton onClick={this.handleNotifyTouchTap}>
                  <NotificationsIcon
                    style={{ color: theme.palette.common.white }}
                  />
                </IconButton>
              </Tooltip>
            )}
            <Notify
              open={this.state.openNotifyMenu}
              anchorEl={this.state.anchorEl}
              onRequestClose={this.handleCloseNotify}
            />

            {/* User avatar */}
            <UserAvatarComponent
              onClick={this.handleAvatarTouchTap}
              fullName="fullname"
              fileName={null}
              size={32}
              style={this.styles.avatarStyle}
            />

            <Menu
              open={this.state.openAvatarMenu}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={this.handleRequestClose}
            >
              <MenuItem
                style={{
                  backgroundColor: 'white',
                  color: blue[500],
                  fontSize: '14px',
                }}
              >
                {' '}
                {'header.myAccount'}{' '}
              </MenuItem>
              <MenuItem
                style={{ fontSize: '14px' }}
                onClick={this.handleLogout}
              >
                {' '}
                {'header.logout'}{' '}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HomeHeaderComponent);
