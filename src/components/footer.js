import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';
// import SocialMediaBar from 'react-social-media-bar';
// import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import { CenterFocusStrong, FormatAlignCenter, MUIicons, VerticalAlignCenter, VerticalAlignCenterSharp } from "@material-ui/icons"
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import { isWidthDown } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#708090',
        height: 100,
        marginTop: '2rem',
        bottom: 0,
        padding: '2rem',
        alignContent: 'center',
        justifyContent: 'center',
        },
    footerContact: {
        color: 'black'
    },
    footerTM: {

        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        VerticalAlignCenter: "center"
    },
    footerLinks: {
        alignContent: "center"

    },
    footerSocial:{
        justifyContent: "center",
        marginTop: 6,
        alignContent: "center",
        alignItems: "center",
        VerticalAlignCenter: "center"
    },
    footerSeparator: {
        height: 100
    }
})
);

function Footer()
{
    const classes = useStyles();
    return (
        <div>
            <BottomNavigation className={classes.footer}>

            <div className={classes.footerContact}>
            {/* <p>Contact us at wearepartiapp@gmail.com</p> */}
            </div>
            <div className={classes.footerSeparator}/>
            <div className={classes.footerLinks}>
                <a href="/feedback"> Feedback </a>
                <a href="/about"> About Us </a>
                <a href = "mailto: wearepartiapp@gmail.com">Contact Us</a>
                <a href="/privacy-policy"> Privacy Policy </a>
                <a href="/terms-and-conditions"> Terms and Conditions</a>
            </div>
                <div className={classes.footerTM}>
                <p>&copy; 2020 Parti LLC. All Rights Reserved.</p>
                </div>

                <div className = {classes.footerSocial}>
                <Link href={`https://www.instagram.com/parti.app/`}>
            <Tooltip title="Instagram">
              <IconButton aria-label="delete" color="primary">
                <InstagramIcon />
              </IconButton>
            </Tooltip>
          </Link>

          <Link href={`https://www.facebook.com/officialpartiapp`}>
            <Tooltip title="Facebook">
            <IconButton aria-label="delete" color="primary">
              <FacebookIcon />
            </IconButton>
          </Tooltip>
        </Link>
        </div>

            </BottomNavigation>
        </div>
    )
}


export default Footer