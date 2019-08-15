// - Import react components
import React, { Component } from 'react';
import _ from 'lodash';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
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
import { HomeRouter } from '../../routes/HomeRouter';

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
    // do some thing
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
    const {
      loaded,
      authed,
      mergedPosts,
      hasMorePosts,
      classes,
      theme,
    } = this.props;
    const loadDataStream = { lastPostId: 'wZd272jJzEYL0DGamuI9' };
    const { drawerOpen } = this.state;
    const drawer = (
      <div>
        <NavLink to="/">
          <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
            <ListItemIcon>
              <SvgHome />
            </ListItemIcon>
            <ListItemText inset primary="home" />
          </MenuItem>
        </NavLink>
        <NavLink to={`/${this.props.uid}`}>
          <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
            <ListItemIcon>
              <SvgAccountCircle />
            </ListItemIcon>
            <ListItemText inset primary="profile" />
          </MenuItem>
        </NavLink>
        <Divider />
        <NavLink to="/settings">
          <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
            <ListItemIcon>
              <SvgSettings />
            </ListItemIcon>
            <ListItemText inset primary="settings" />
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
            <HR enabled data={{ mergedPosts, loadDataStream, hasMorePosts }} />
          </main>
        </div>
      </div>
    );
  }
}

// - Map dispatch to props

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = () => ({
  uid: 'hAHapsdojasHDsahd123k123123',
  authed: true,
  isVerifide: true,
  mergedPosts: [
    {
      ownerUserId: 'dsfzsdffdsafds',
      ownerDisplayName: 'Tran Manh Duy',
      creationDate: 1565631211,
      image: '',
      body: 'how are you?',
      id: '787',
      commentCounter: 2,
    },
    {
      ownerUserId: '6234243243',
      ownerDisplayName: 'Nguyen Thi A',
      creationDate: 1565631211,
      image: '',
      body: 'are you feeling?',
      id: '423f',
      commentCounter: 4,
    },
    {
      ownerUserId: '1dfsd123123',
      ownerDisplayName: 'Truong Quoc B',
      creationDate: 1565631211,
      image: '',
      body: 'be happy',
      id: '2143xcv',
      commentCounter: 10,
    },
  ],
  global,
  hasMorePosts: false,
  loaded: true,
});

// - Connect component to redux store
export default withRouter(
  connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(HomeComponent),
  ),
);
