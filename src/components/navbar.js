import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'

//Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import DehazeIcon from '@material-ui/icons/Dehaze';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    backgroundColor: 'white',
    boxShadow: 'None',
    padding: theme.spacing(1),
    fontFamily: '"Monserrat", sans-serif',
  },
  logo: {
    height: 70,
  }, 
  menuItem: {
    color: 'black'
  }
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
    width: '200px',
    height: '50px'
  },
}))(MenuItem);

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
        <Link href="/">
            <StyledMenuItem className={classes.menuItem}>
              <p>Home</p>
            </StyledMenuItem>
        </Link>
        <Link href="/about">
            <StyledMenuItem className={classes.menuItem}>
              <p>About</p>
            </StyledMenuItem>
        </Link>
        <Link href="/discover">
            <StyledMenuItem className={classes.menuItem}>
              <p>Discover</p>
            </StyledMenuItem>
        </Link>
        <hr></hr>
        <Link href="/signup">
              <StyledMenuItem className={classes.menuItem}>
                <p>Sign Up</p>
              </StyledMenuItem>
        </Link>
        <Link href="/login">
            <StyledMenuItem className={classes.menuItem}>
              <p>Log In</p>
            </StyledMenuItem>
        </Link>
        <hr></hr>
        <Link href="/faq">
            <StyledMenuItem className={classes.menuItem}>
              <p>Help</p>
            </StyledMenuItem>
        </Link>
      </div>
    }else if(authenticated && user.type === 'client')
    {
      mobileMenuOptions = 
      <div>
      <Link href="/">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Home</p>
          </StyledMenuItem>
      </Link>
      <Link href="/events">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Events</p>
          </StyledMenuItem>
      </Link>
      <Link href="/contracts">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Contracts</p>
          </StyledMenuItem>
      </Link>
      <Link href="/connections">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Connects</p>
          </StyledMenuItem>
      </Link>
      <Link href="/discover">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Discover</p>
          </StyledMenuItem>
      </Link>
      <hr></hr>
      <Link href="/account/edit">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
          >
              <AccountCircle />
          </IconButton>
          <p>Profile</p>
          </StyledMenuItem>
      </Link>
      <Link onClick={this.logOut}>
        <StyledMenuItem className={classes.menuItem}>
            <IconButton
                aria-label="Log Out"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
            <ExitToAppIcon />
            </IconButton>
            <p>Log Out</p>
          </StyledMenuItem> 
      </Link>
      <hr></hr>
      <Link href="/faq">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Help</p>
          </StyledMenuItem>
      </Link>
      </div>
    }else if(authenticated && user.type === 'service')
    {
      mobileMenuOptions = 
      <div>
      <Link href="/">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Home</p>
          </StyledMenuItem>
      </Link>
      <Link href="/contracts">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Contracts</p>
          </StyledMenuItem>
      </Link>
      <Link href="/connections">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Connects</p>
          </StyledMenuItem>
      </Link>
      <Link href="/discover">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Discover</p>
          </StyledMenuItem>
      </Link>
      
      <hr></hr>
      <Link href="/account/edit">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
          >
              <AccountCircle />
          </IconButton>
          <p>Profile</p>
          </StyledMenuItem>
      </Link>
      <Link onClick={this.logOut}>
        <StyledMenuItem className={classes.menuItem}>
            <IconButton
                aria-label="Log Out"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
            <ExitToAppIcon />
            </IconButton>
            <p>Log Out</p>
          </StyledMenuItem> 
      </Link>
      <hr></hr>
      <Link href="/faq">
          <StyledMenuItem name="home" className={classes.menuItem}>
          <p>Help</p>
          </StyledMenuItem>
      </Link>
    </div>
    }

    const renderMobileMenu = (
      <StyledMenu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
      {mobileMenuOptions}
      </StyledMenu>
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
              <Link href="/connections">
              <Button className={classes.menuButton}>Connects</Button>
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
            <Link href="/connections">
              <Button className={classes.menuButton}>Connects</Button>
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
        <div className="accountIcon">
        <Link>
          <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={this.handleClick}
              color="black"
              >
              <AccountCircle />
            </IconButton>
            <StyledMenu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              >
                <Link href="/account/edit">
                    <StyledMenuItem className={classes.menuItem}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                    </StyledMenuItem> 
                </Link>

                <Link>
                  <StyledMenuItem onClick={this.logOut} className={classes.menuItem}>
                      <IconButton
                          aria-label="account of current user"
                          aria-controls="primary-search-account-menu"
                          aria-haspopup="true"
                          color="inherit"
                      >
                          <ExitToAppIcon />
                      </IconButton>
                      <p>Log Out</p>
                  </StyledMenuItem> 
                </Link>
            </StyledMenu>
        </Link>
        </div>
    </div>
    )
    :
    (            
      <div className={classes.sectionDesktop}>
          <div className="accountIcon">
          <Link>
            <IconButton
                aria-label="Profile Icon Button"
                aria-haspopup="true"
                onClick={this.handleClick}
                color="black"
                >
                <AccountCircle />
              </IconButton>
              <StyledMenu
                id="customized-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
                >

                <Link href="/signup" className={classes.menuItem}>
                  <StyledMenuItem>
                    <p>Sign Up</p>
                  </StyledMenuItem> 
                </Link>

                <Link href="/login" className={classes.menuItem}>
                  <StyledMenuItem>
                      <p>Log In</p>
                  </StyledMenuItem> 
                </Link>

                <hr></hr>

                <Link href="/signup/vendor" className={classes.menuItem}>
                  <StyledMenuItem>
                      <p>Join as a Vendor</p>
                  </StyledMenuItem> 
                </Link>

                <Link href="/events/new" className={classes.menuItem}>
                  <StyledMenuItem>
                      <p>Create an Event</p>
                  </StyledMenuItem> 
                </Link>

                <hr></hr>

                <Link href="/faq" className={classes.menuItem}>
                  <StyledMenuItem>
                      <p>Help</p>
                  </StyledMenuItem> 
                </Link>

              </StyledMenu>
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
                <img src={logobluebeta} className={classes.logo} alt="partilogo"></img>
            </a>


            <div className={classes.grow} />
            {renderNavbarButtons}
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

