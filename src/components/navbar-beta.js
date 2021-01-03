import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

//Logo
import logobluebeta from '../resources/logos/wowblue.jpeg'

//Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {logoutUser} from '../redux/actions/userActions'

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  navbar: {
    color: 'black',
    backgroundColor: '#FFFFFF',
    boxShadow: 'None',
    padding: theme.spacing(1)
  },
  logo: {
    height: 80,
  }, 
  buttonGroup: {
    marginLeft: 20, 
    paddingTop: 30
  }
});

class NavbarBeta extends React.Component {
  constructor()
  {
    super(); 
    this.state = {
      achorEl: false,
      MobileMoreAnchorEl: false, 
      anchorEl: null
    };
  }

  handleClick = (event) =>
  {
    this.setState({
      anchorEl: event.currentTarget
    })
  }
   
  handleClose = () =>
  {
    this.setState({
      anchorEl: null
    })
  }

  handleProfileMenuOpen = event => {
    this.setState({
      achorEl: event.currentTarget
    });
  };

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null
    });
  };

  handleMenuClose = () => {
    this.setState({
      achorEl: null,
      mobileMoreAnchorEl: null
    });
  };

  handleMobileMenuOpen = event => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget
    });
  };

  onClick = event =>
  {
      console.log(event)
  }

  logOut = () =>
  {
    this.props.logoutUser(); 
  }

  render() 
  {
    const { classes } = this.props;

    return (
        <div className={classes.grow}>
        <AppBar position="static" className={classes.navbar}>
            <Toolbar>

            <a href="/" className={classes.logo}>
                <img src={logobluebeta} className={classes.logo} alt="partilogo"></img>
            </a>
            </Toolbar>
        </AppBar>
        </div>
    );
  }
}

NavbarBeta.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NavbarBeta))