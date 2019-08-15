// - Import react components
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SvgHome from '@material-ui/icons/Home';
import SvgSettings from '@material-ui/icons/Settings';
import SvgAccountCircle from '@material-ui/icons/AccountCircle';
import Hidden from '@material-ui/core/Hidden';
import { FormattedMessage } from 'react-intl';
import { HomeRouter } from '../../routes/HomeRouter';

import messages from './messages';

// - Import app components
import HomeHeader from '../homeHeader';

// - Import API

// - Import actions

// - Import actions

const drawerWidth = 220;
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    maxWidth: drawerWidth,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  drawerPaperLarge: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      height: '100%',
    },
    top: 70,
    backgroundColor: '#fafafa',
    borderRight: 0,
  },
  menu: {
    height: '100%',
  },
  content: {
    backgroundColor: 'transparent',
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  'content-left': {
    marginLeft: 0,
  },
  'content-right': {
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
  'contentShift-right': {
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: 0,
    },
  },
  underline: {
    textDecoration: 'none',
  },
  nonePaddingLeft: {
    paddingLeft: '0px',
  },
});

// - Create Home component class
export class HomeComponent extends Component {
  // Constructor
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      drawerOpen: false,
    };

    // Binding function to `this`
  }

  /**
   * Handle drawer toggle
   */
  handleDrawerToggle = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  componentWillMount() {
    const { authed, goTo } = this.props;
    if (!authed) {
      goTo('/login');
    }
  }

  /**
   * Render DOM component
   *
   * @returns DOM
   *
   * @memberof Home
   */
  render() {
    const HR = HomeRouter;
    const { uid, mergedPosts, hasMorePosts, classes, theme } = this.props;
    const { drawerOpen } = this.state;
    const drawer = (
      <div>
        <NavLink to="/" className={classes.underline}>
          <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
            <ListItemIcon>
              <SvgHome />
            </ListItemIcon>
            <ListItemText
              className={classes.nonePaddingLeft}
              inset
              primary={<FormattedMessage {...messages.home} />}
            />
          </MenuItem>
        </NavLink>
        <NavLink to={`/${uid}`} className={classes.underline}>
          <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
            <ListItemIcon>
              <SvgAccountCircle />
            </ListItemIcon>
            <ListItemText
              className={classes.nonePaddingLeft}
              inset
              primary={<FormattedMessage {...messages.profile} />}
            />
          </MenuItem>
        </NavLink>
        <Divider />
        <NavLink to="/settings" className={classes.underline}>
          <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
            <ListItemIcon>
              <SvgSettings />
            </ListItemIcon>
            <ListItemText
              className={classes.nonePaddingLeft}
              inset
              primary={<FormattedMessage {...messages.setting} />}
            />
          </MenuItem>
        </NavLink>
      </div>
    );

    const anchor = theme.direction === 'rtl' ? 'right' : 'left';
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <HomeHeader
            onToggleDrawer={this.handleDrawerToggle}
            drawerStatus={this.state.drawerOpen}
          />
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              open={this.state.drawerOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div>
                <div className={classes.drawerHeader} />
                <MenuList
                  style={{ color: 'rgb(117, 117, 117)', width: '210px' }}
                >
                  <Divider />
                  {drawer}
                </MenuList>
              </div>
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="js">
            <Drawer
              variant="persistent"
              open={this.state.drawerOpen}
              classes={{
                paper: classes.drawerPaperLarge,
              }}
            >
              <div>
                <MenuList
                  className={classes.menu}
                  style={{ color: 'rgb(117, 117, 117)', width: '210px' }}
                >
                  {drawer}
                </MenuList>
              </div>
            </Drawer>
          </Hidden>
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: drawerOpen,
                [classes[`contentShift-${anchor}`]]: drawerOpen,
              },
            )}
          >
            <HR enabled data={{ mergedPosts, hasMorePosts }} />
          </main>
        </div>
      </div>
    );
  }
}

// - Map dispatch to props
const mapDispatchToProps = dispatch => ({
  goTo: url => dispatch(push(url)),
});
/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = state => ({
  authed: true,
  mergedPosts: state.posts.data,
  hasMorePosts: false,
});

// - Connect component to redux store
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles, { withTheme: true })(HomeComponent)),
);
