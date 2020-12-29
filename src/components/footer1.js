import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';
// import SocialMediaBar from 'react-social-media-bar';
// import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import { MUIicons } from "@material-ui/icons"
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';





const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#708090',
        height: 100,
    }
}));

function Footer1()
{
    const classes = useStyles();
    return (
        <div>
            <BottomNavigation className={classes.footer}>

            <div>
                <a href="/feedback"> Feedback </a>
                <a href="/feedback"> Privacy Policy </a>
                <a href="/about">About Us </a>
                </div>

            </BottomNavigation>
        </div>
    )
}


export default Footer1