import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../resources/logos/appicon-whitebg.png';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
      fontSize: '0.75rem'
    },
    title: {
        flexGrow:1
    },
    flex: {
        flexGrow: 1
    },
    navbar: {
        color: 'black',
        backgroundColor: 'white',
        boxShadow: 'None',
        padding: theme.spacing(1)
    },
    logo: {
        height: 50,
        width: 50,
    }, 
    buttonGroup: {
        marginLeft: 20
    }
  }));

function Navbar()
{
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>

            <a href="index.html" className={classes.logo}>
                <img src={logo} className={classes.logo}></img>
            </a>

            <div className={classes.buttonGroup}>
                <Link href="/">
                  <Button color="inherit" className={classes.menuButton}>home</Button>
                </Link> 
                <Link href="/about">
                  <Button color="inherit" className={classes.menuButton}>about</Button>
                </Link> 
                <Link href="#">
                  <Button color="inherit" className={classes.menuButton}>careers</Button>
                </Link>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    );
}

export default Navbar