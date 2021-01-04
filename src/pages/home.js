import "../stylesheets/common.css";
import "../stylesheets/home.css";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import React from "react";

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AlbumIcon from '@material-ui/icons/Album';
import PetsIcon from '@material-ui/icons/Pets';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import PaletteIcon from '@material-ui/icons/Palette';
import BrushIcon from '@material-ui/icons/Brush';
import BusinessIcon from '@material-ui/icons/Business';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {firebaseAnalytics} from '../utils/firebase'

const discoverCategories = [
  ["DJ", <AlbumIcon fontSize="large"/>],
  ["Photography", <PhotoCameraIcon fontSize="large"/>],
  ["Magician", <BrushIcon fontSize="large"/>],
  ["Comedian", <EmojiEmotionsIcon fontSize="large"/>],
  ["Event Venue", <BusinessIcon fontSize="large"/>],
  ["Decorator", <PaletteIcon fontSize="large"/>],
  ["Food Catering", <LocalDiningIcon fontSize="large"/>],
  ["Petting Zoo", <PetsIcon fontSize="large"/>]
];


// const testimonials = [
//   {
//     name: "Person 1",
//     description:
//       '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus laoreet velit tempus nam ullamcorper vulputate. Varius ligula bibendum cursus urna luctus velit ullamcorper etiam egestas."',
//   },
//   {
//     name: "Person 2",
//     description:
//       '"Borem ipsum dolor sit amet, consectetur adipiscing elit. Netus laoreet velit tempus nam ullamcorper vulputate. Varius ligula bibendum cursus urna luctus velit ullamcorper etiam egestas."',
//   },
// ];

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  
  render() {
    // Deal with checking if user is logged in and which user it is.
    //
    // Important variables are:
    // authenticated = (true or false depending on if someone is logged in)
    // authenticatedUser = (service or client logged in with their own sub-variables)
    //
    const { authenticated } = this.props.user;
    const { isLoading } = this.props.data;
    let authenticatedUser;
    if (authenticated) {
      authenticatedUser = this.props.user.user;
    }

    // Conditional Introduction Section of Homepage
    const client_introduction = (
      <Grid item sm={12} xs={12} className="home-introduction">
        <div className="banners">
          <p className="bannerTitle" >
            <b>Effortless Event Planning</b>
          </p>
          <p className="bannerPitch">
            Manage all of your event's needs in 1 app
          </p>
          <p>
            Need a DJ for your party? A photographer for your wedding?
            Parti will help you find the perfect services. Start by creating your first event!
          </p>
    
          <div className="bannerButton">
            <Link href="/events/new">
              <Button variant="contained" color="primary">
                Create an Event
              </Button>
            </Link>
          </div>
    
          <div className="bannerButton">
            <Link href="/about">
              <Button variant="outlined" color="primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    )
    const service_introduction = (
      <Grid item sm={12} xs={12} className="home-introduction">
        <div className="banners">
          <p className="bannerTitle" >
            <b>Effortless Event Planning</b>
          </p>
          <p className="bannerPitch">
            Manage all of your client's needs in 1 app
          </p>
          <p>
            Looking for events to DJ? Provide photography for events?
            Parti will help you connect with clients and build your brand. Start by browsing local events!
          </p>
    
          <div className="bannerButton">
            <Link href="/discover-events">
              <Button variant="contained" color="primary">
                Find Events
              </Button>
            </Link>
          </div>
    
          <div className="bannerButton">
            <Link href="/about">
              <Button variant="outlined" color="primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    )
    let conditional_introduction = null;
    if (authenticated && authenticatedUser.type === "service") {
      conditional_introduction = service_introduction;
    } else {
      conditional_introduction = client_introduction;
    }

    // Conditional Discover Section of Homepage
    const client_discover = (
      <Grid container align="center">
        <div className="home-sub-black">
          <Grid item sm={12} xs={12}>
            <p className="subBannerTitle">
              <b>DISCOVER</b>
            </p>
            <p>Find services for your upcoming event.</p>
          </Grid>

          <Grid container align="center">
            {discoverCategories.map((cat) => 
            (
                <Grid
                  item
                  sm={3}
                  xs={6}
                  className="home-discover-item"
                >   
                <Link href={`/discover/${cat[0]}`}>
                  <Grid item>
                        {cat[1]}
                    </Grid>
                    <Grid item>
                      <p>{cat[0]}</p>
                    </Grid>
                    </Link>
                </Grid>
            ))}
          </Grid>

          <div className="subBannerButton">
            <Link href="/discover">
              <Button variant="contained" color="primary">
                Discover More
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    )
    const service_discover = (
      <Grid container align="center">
        <div className="home-sub-black">
          <Grid item sm={12} xs={12}>
            <p className="subBannerTitle">
              <b>DISCOVER</b>
            </p>
            <p>Find events near you.</p>
          </Grid>
          <div className="subBannerButton">
            <Link href="/discover-events">
              <Button variant="contained" color="primary">
                Discover More
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    )
    let conditional_discover = null;
    if (authenticated && authenticatedUser.type === "service") {
      conditional_discover = service_discover;
    } else {
      conditional_discover = client_discover;
    }

    let homepage_contents = (
      <div className="homePage">
          <Grid container spacing={0}>
            {/*Introduction*/}
            {conditional_introduction}
            
            {/*Discover*/}   
            {conditional_discover}     

            {/*About Us*/}
            <Grid container align="center">
              <div className="home-sub-white">
                <p className="subBannerTitle">
                  <b>ABOUT PARTI</b>
                </p>

                <p className="home-about-parti">
                  <b>Hosting an event is stressful.</b> Parti will assist you in finding professional 
                  services and make the event planning process easy. 
                </p>

                <p className="home-about-parti">
                  Are you a vendor? Parti enables you to <b>directly seek customers</b>. See who is in 
                  need of your services nearby.
                </p>

                <div className="subBannerButton">
                  <Link href="/about">
                    <Button variant="contained" color="primary">
                      Learn More
                    </Button>
                  </Link>
                </div>

                <div className="subBannerButton">
                  <Link href="/faq">
                    <Button variant="outlined" color="primary">
                      FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </Grid>

            {/* Testimonials */}

            {/* <Grid container item sm={12} xs={12}>
              <div className="home-sub-black">
                <p className="subBannerTitle">
                  <b>TESTIMONIALS</b>
                </p>

                <Carousel
                  navButtonsAlwaysInvisible="false"
                  interval="5000"
                  timeout="1000"
                >
                  {testimonials.map((testimonial) => (
                    <p>
                      {testimonial.description} -{testimonial.name}
                    </p>
                  ))}
                </Carousel>
              </div>
            </Grid> */}

            
          </Grid>
        </div>
    )
    let nothing;
    let homePage;
    if (!isLoading) {
      homePage = homepage_contents
    }
    else {
      homePage = nothing
    }
    
    return (
      <div>
        {homePage}
      </div>
    );
  }
}

// Below is for checking user authenticated or not and mapping state to props
Home.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user
})

export default connect(mapStateToProps)(Home);
