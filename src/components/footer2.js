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

function Footer2()
{
    const classes = useStyles();
    return (
        <div>
            <BottomNavigation className={classes.footer}>
            <div>

                <p>&copy; 2020 Parti LLC. All Rights Reserved.</p>

</div>

            </BottomNavigation>
        </div>
    )
}


export default Footer2