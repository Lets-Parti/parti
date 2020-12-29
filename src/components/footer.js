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
import {footerStyle} from '../stylesheets/footer.css'





const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#708090',
        height: 100,
    },
    footerStyle: {
        color: '#FFFFFF'
    }
}));

function Footer()
{
    const classes = useStyles();
    return (
        <div>
            <BottomNavigation className={classes.footer}>
            <div>
            <p>Contact us at wearepartiapp@gmail.com</p>
            </div>
            <div>
                <a href="/feedback"> Feedback </a>
                <a href="/feedback"> Privacy Policy </a>
                <a href="/about">About Us </a>
                </div>
{/* 
                <SocialIcon url="https://www.facebook.com/officialpartiapp" />
                <SocialIcon url="https://www.instagram.com/parti.app/" /> */}
                <div className={classes.footerStyle}>
                <p>&copy; 2020 Parti LLC. All Rights Reserved.</p>
                </div>


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

            </BottomNavigation>
        </div>
    )
}


export default Footer