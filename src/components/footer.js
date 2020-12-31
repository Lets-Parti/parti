import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { SocialMediaIconsReact } from "social-media-icons-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { SocialIcon } from "react-social-icons";
import Grid from "@material-ui/core/Grid";
// import SocialMediaBar from 'react-social-media-bar';
// import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
// import { MDBIcon, MDBContainer, MDBBtn } from "mdbreact";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
// import { Container, Nav, NavItem } from 'react-bootstrap';
import {
  CenterFocusStrong,
  FormatAlignCenter,
  MUIicons,
  VerticalAlignCenter,
  VerticalAlignCenterSharp,
} from "@material-ui/icons";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { isWidthDown } from "@material-ui/core";
import "../stylesheets/footer.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
  footer: {
    // backgroundColor: "#708090",
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="black" align="center">
      &copy; 2020 Parti LLC. All Rights Reserved.
    </Typography>
  );
}

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <Container maxWidth="xl" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          <Grid item xs={6} sm={3} key="Company">
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Company
            </Typography>
            <ul>
              <li key="About">
                <Link href="/about" variant="subtitle1" color="textSecondary">
                  About Us
                </Link>
              </li>
              <li key="Contact">
                <Link
                  href="mailto: wearepartiapp@gmail.com"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={6} sm={3} key="Legal">
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Legal
            </Typography>
            <ul>
              <li key="Privacy">
                <Link
                  href="/privacy-policy"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li key="Terms">
                <Link
                  href="/terms-and-conditions"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={6} sm={3} key="Social">
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Social
            </Typography>
            <Grid container spacing={0} justify="space-evenly">
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
            </Grid>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default Footer;
