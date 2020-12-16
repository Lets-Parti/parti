import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MailIcon from "@material-ui/icons/Mail";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'

//Icons
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import EventIcon from '@material-ui/icons/Event';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DehazeIcon from '@material-ui/icons/Dehaze';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//Logo
import logo from '../resources/logos/main.svg'

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
    backgroundColor: 'white',
    boxShadow: 'None',
    padding: theme.spacing(1)
  },
  logo: {
    height: 50,
  }, 
  buttonGroup: {
    marginLeft: 20, 
    paddingTop: 30
  }
});

class Navbar extends React.Component {
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
    const {authenticated, user} = this.props.user
    const { classes } = this.props;
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);
    const mobileMenuId = "primary-search-account-menu-mobile";

    let mobileMenuOptions = null; 
    if(!authenticated)
    {
      mobileMenuOptions = 
      <div>
        <Link href="/about">
            <MenuItem>
            <IconButton color="inherit">
                <HomeIcon />
            </IconButton>
            <p>Home</p>
            </MenuItem>
        </Link>
        <Link href="/about">
            <MenuItem name="about" onClick={this.onClick}>
            <IconButton color="inherit" >
                <InfoIcon />
            </IconButton>
            <p>About</p>
            </MenuItem>
        </Link>
        <Link href="/discover">  
            <MenuItem>
            <IconButton color="inherit">
                <SearchIcon />
            </IconButton>
            <p>Discover</p>
            </MenuItem>
        </Link>
        <Link href="/login">
            <MenuItem>
            <IconButton color="inherit">
                <AccountCircle />
            </IconButton>
            <p>Log In</p>
            </MenuItem>
        </Link>
        <Link href="/signup">
            <MenuItem>
            <IconButton color="inherit">
                <AccountCircle />
            </IconButton>
            <p>Sign Up</p>
            </MenuItem>
        </Link>
      </div>
    }else if(authenticated && user.type === 'client')
    {
      mobileMenuOptions = 
      <div>
      <Link href="/home">
          <MenuItem name="home">
          <IconButton aria-label="" color="inherit">
              <HomeIcon />
          </IconButton>
          <p>Home</p>
          </MenuItem>
      </Link>
      <Link href="/events">
          <MenuItem id="events">
          <IconButton aria-label="" color="inherit">
              <EventIcon />
          </IconButton>
          <p>Events</p>
          </MenuItem>
      </Link>
      <Link href="/contracts">
          <MenuItem>
          <IconButton aria-label="" color="inherit">
              <ReceiptIcon />
          </IconButton>
          <p>Contracts</p>
      </MenuItem>
      </Link>

      <Link href="/discover">
          <MenuItem>
          <IconButton aria-label="" color="inherit">
              <SearchIcon />
          </IconButton>
          <p>Discover</p>
          </MenuItem>
      </Link>

      <Link href="/messages">
          <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
              <MailIcon />
              </Badge>
          </IconButton>
          <p>Messages</p>
          </MenuItem>
      </Link>

      <Link href="/notifications">
      <MenuItem>
      <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
          <NotificationsIcon />
          </Badge>
      </IconButton>
      <p>Notifications</p>
      </MenuItem>
      </Link>

      <Link href="/account/edit">
          <MenuItem>
          <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
          >
              <AccountCircle />
          </IconButton>
          <p>Profile</p>
          </MenuItem> 
      </Link>

      <Link onClick={this.logOut}>
        <MenuItem>
            <IconButton
                aria-label="Log Out"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
            <ExitToAppIcon />
            </IconButton>
            <p>Log Out</p>
          </MenuItem> 
      </Link>
      </div>
    }else if(authenticated && user.type === 'service')
    {
      mobileMenuOptions = 
      <div>
      <Link href="/home">
          <MenuItem name="home">
          <IconButton aria-label="" color="inherit">
              <HomeIcon />
          </IconButton>
          <p>Home</p>
          </MenuItem>
      </Link>
      <Link href="/contracts">
          <MenuItem>
          <IconButton aria-label="" color="inherit">
              <ReceiptIcon />
          </IconButton>
          <p>Contracts</p>
      </MenuItem>
      </Link>
      <Link href="/discover">  
            <MenuItem>
            <IconButton color="inherit">
                <SearchIcon />
            </IconButton>
            <p>Discover</p>
            </MenuItem>
        </Link>
      <Link href="/messages">
          <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
              <MailIcon />
              </Badge>
          </IconButton>
          <p>Messages</p>
          </MenuItem>
      </Link>
      <Link href="/notifications">
      <MenuItem>
      <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
          <NotificationsIcon />
          </Badge>
      </IconButton>
      <p>Notifications</p>
      </MenuItem>
      </Link>
      <Link href="/account/edit">
          <MenuItem>
          <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
          >
              <AccountCircle />
          </IconButton>
          <p>Profile</p>
          </MenuItem> 
      </Link>
      <Link onClick={this.logOut}>
        <MenuItem>
            <IconButton
                aria-label="Log Out"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
            <ExitToAppIcon />
            </IconButton>
            <p>Log Out</p>
          </MenuItem> 
      </Link>
    </div>
    }

    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
      {mobileMenuOptions}
      </Menu>
    );

    let renderNavbarButtons = null; 
    if(!authenticated)
    {
      renderNavbarButtons = 
      <div className={classes.sectionDesktop}>
        <div className={classes.buttonGroup}>
            <Link href="/">
            <Button className={classes.menuButton}>Home</Button>
            </Link> 
            <Link href="/about">
            <Button className={classes.menuButton}>About</Button>
            </Link> 
            <Link href="/discover">
            <Button className={classes.menuButton}>Discover</Button>
            </Link> 
        </div>
      </div>
    }else if(authenticated && user.type === 'client')
    {
      renderNavbarButtons = 
      <div className={classes.sectionDesktop}>
          <div className={classes.buttonGroup}>
              <Link href="/">
              <Button className={classes.menuButton}>Home</Button>
              </Link> 
              <Link href="/events">
              <Button className={classes.menuButton}>Events</Button>
              </Link> 
              <Link href="/contracts">
              <Button className={classes.menuButton}>Contracts</Button>
              </Link> 
              <Link href="/discover">
              <Button className={classes.menuButton}>Discover</Button>
              </Link> 
          </div>
      </div>
    }else if(authenticated && user.type === 'service')
    {
      renderNavbarButtons = 
      <div className={classes.sectionDesktop}>
          <div className={classes.buttonGroup}>
            <Link href="/">
            <Button className={classes.menuButton}>Home</Button>
            </Link> 
            <Link href="/contracts">
            <Button className={classes.menuButton}>Contracts</Button>
            </Link> 
            <Link href="/discover">
              <Button className={classes.menuButton}>Discover</Button>
              </Link> 
          </div>
      </div>
    }

    const renderRightSideButtons = authenticated ? 
    (            
    <div className={classes.sectionDesktop}>
        <Link href="/messages">
            <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={0} color="primary">
                <MailIcon />
            </Badge>
            </IconButton>
        </Link>

        <Link href="/notifications">
            <IconButton
            aria-label="show 17 new notifications"
            color="inherit"
            >
            <Badge badgeContent={0} color="primary">
                <NotificationsIcon />
            </Badge>
            </IconButton>
        </Link>

        <div className="accountIcon">
        <Link>
          <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={this.handleClick}
              color="inherit"
              >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              >
                <Link href="/account/edit">
                    <MenuItem>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                    </MenuItem> 
                </Link>
                <Link>
                  <MenuItem onClick={this.logOut}>
                      <IconButton
                          aria-label="account of current user"
                          aria-controls="primary-search-account-menu"
                          aria-haspopup="true"
                          color="inherit"
                      >
                          <ExitToAppIcon />
                      </IconButton>
                      <p>Log Out</p>
                  </MenuItem> 
                </Link>
            </Menu>
        </Link>
        </div>
    </div>
    )
    :
    (
    <div className={classes.sectionDesktop}>
        <div className={classes.buttonGroup}>
            <Link href="/login">
            <Button className={classes.menuButton} variant="outlined" color="primary">Log In</Button>
            </Link> 
            <Link href="/signup">
            <Button className={classes.menuButton} variant="contained" color="primary">Sign Up</Button>
            </Link> 
        </div>
    </div>
    )
    
    let rightSideButton = null; 
    if(authenticated && user.type === 'client')
    {
      rightSideButton =       
      <Link href="/events/new">
        <Button className={classes.menuButton} variant="contained" color="primary">New Event</Button>
      </Link> 
    }else if(authenticated && user.type === 'service')
    {
      rightSideButton = 
      <Link href="/discover-events">
        <Button className={classes.menuButton} variant="contained" color="primary">Find Events</Button>
      </Link> 
    }

    return (
        <div className={classes.grow}>
        <AppBar position="static" className={classes.navbar}>
            <Toolbar>

            <a href="/" className={classes.logo}>
                <img src={logo} className={classes.logo} alt="partilogo"></img>
            </a>
            {renderNavbarButtons}

            <div className={classes.grow} />

            {rightSideButton}

            <div className={classes.sectionMobile}>
                <IconButton
                aria-label="show more"
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
                >
                <DehazeIcon />
                </IconButton>
            </div>

            {renderRightSideButtons}
            </Toolbar>
        </AppBar>
        
        {renderMobileMenu}
        </div>
    );
  }
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar))

