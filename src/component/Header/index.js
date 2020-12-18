import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import logo from '../../assets/images/logo.png';
import SignOutButton from '../Auth/logout';
import { AuthUserContext } from '../session';
import { NavLink } from 'react-router-dom';


const styles = theme => ({
  root: {
    width: '100%',
    color: 'black'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimaryHeader extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>
        <AuthUserContext.Consumer>
                    {authUser =>
                      authUser ? <SignOutButton /> :  null
                    }
        </AuthUserContext.Consumer>
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose} style={{padding:"5px"}}>
          <AuthUserContext.Consumer>
              {authUser =>
                authUser ?<NavLink style={{color:"#d8caca"}} to='/order'>Order</NavLink> : null
              }
          </AuthUserContext.Consumer>
        </MenuItem>
      </Menu>
    );

    return (
      <div style={{height: '60px', backgroundColor: '#FCFCFC',}} className={classes.root}>
        <AppBar  style={{backgroundColor: '#FCFCFC', height: '60px', zIndex:"900"}} position="static">
          <Toolbar>
            <span className={classes.menuButton} color="inherit" aria-label="Open drawer">
             <img src={logo} height='57'  width='250' alt="Construyo logo" name="Construyo logo" />
            </span>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <MenuItem onClick={this.handleMobileMenuClose} style={{ padding: "3px" }}>
                <AuthUserContext.Consumer>
                    {authUser =>
                      authUser ?<NavLink style={{color:"#000", textDecoration: "none", padding: '2px' }} to='/order'>Orders</NavLink> : null
                    }
                </AuthUserContext.Consumer>
              </MenuItem>
              <MenuItem onClick={this.handleMobileMenuClose} style={{ padding: "3px" }}>
                <AuthUserContext.Consumer>
                            {authUser =>
                              authUser ? <SignOutButton /> :  null
                            }
                </AuthUserContext.Consumer>
              </MenuItem>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimaryHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimaryHeader);