import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import logo from '../resources/logos/main.svg';


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
    }, 
    buttonGroup: {
        marginLeft: 20, 
        paddingTop: 30
    }
  }));

function Navbar()
{
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>

            <a href="/" className={classes.logo}>
                <img src={logo} className={classes.logo} alt="partilogo"></img>
            </a>

            <div className={classes.buttonGroup}>
                <Link href="/">
                  <Button className={classes.menuButton}>home</Button>
                </Link> 
                <Link href="/about">
                  <Button className={classes.menuButton}>about</Button>
                </Link> 
                <Link href="#">
                  <Button className={classes.menuButton}>careers</Button>
                </Link>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    );
}

export default Navbar