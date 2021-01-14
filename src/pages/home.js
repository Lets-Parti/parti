import "../stylesheets/common.css";
import "../stylesheets/home.css";
import "../stylesheets/beta.css";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import React from "react";
import TextField from '@material-ui/core/TextField';

import DJIcon from '../resources/icons/dj.png';
import PhotoIcon from '../resources/icons/photo.png'; 
import ComedianIcon from '../resources/icons/comedian.png'; 
import MagicIcon from '../resources/icons/magic.png';
import PlaceIcon from '../resources/icons/place.png';
import LanternIcon from '../resources/icons/lantern.png';
import BuffetIcon from '../resources/icons/buffet.png'; 
import MonkeyIcon from '../resources/icons/monkey.png';

import HomeHeroText from '../resources/images/home_hero_text.svg';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import axios from 'axios';

import {firebaseAnalytics} from '../utils/firebase'

const discoverCategories = [
  ["DJ", <img src={DJIcon} className="discover-icon"/>],
  ["Photography", <img src={PhotoIcon} className="discover-icon"/>],
  ["Magician", <img src={MagicIcon} className="discover-icon"/>],
  ["Comedian", <img src={ComedianIcon} className="discover-icon"/>],
  ["Event Venue", <img src={PlaceIcon} className="discover-icon"/>],
  ["Decorator", <img src={LanternIcon} className="discover-icon"/>],
  ["Food Catering", <img src={BuffetIcon} className="discover-icon"/>],
  ["Petting Zoo", <img src={MonkeyIcon} className="discover-icon"/>]
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
  
  constructor()
    {   
        super()
        this.state = {
            fullName: '', 
            email: '', 
            phone: '', 
            company: '',
            isSubmitted: false, 
        }
        this.eventChange = this.eventChange.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
    }   
    
    componentDidMount()
    {
      firebaseAnalytics.logEvent("home_visited");
    }

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm()
    {
        this.setState({
            isSubmitted: true
        })

        let dataSentToDB = {
            fullName: this.state.fullName, 
            email: this.state.email, 
            phone: this.state.phone, 
            company: this.state.company
        }

        axios.post('/newsletter', JSON.stringify(dataSentToDB),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res =>
        {
            console.log('Newsletter submitted');
        })
        .catch(err =>
        {
            alert('Oops. Something went wrong ;(');
        })
    }
 
  render() {
    const { authenticated } = this.props.user;
    const { isLoading } = this.props.data;
    let authenticatedUser;
    if (authenticated) {
      authenticatedUser = this.props.user.user;
    }

    // Conditional Introduction Section of Homepage
    const client_introduction = (
      <Grid item sm={12} xs={12} className="home-introduction" align="center">
        <div className="banners">
          <p className="bannerTitle" >
            Effortless Event Planning
          </p>
    
          <div className="bannerButton">
            <Link href="/events/new">
              <Button variant="contained" color="primary" size="large">
                Create an Event
              </Button>
            </Link>
          </div>
          <Link href="/signup/vendor" >
            <p className="darkText"><u>Are you a vendor? List yourself here</u></p>
          </Link>
          <div className="bannerButton">
            <Link href="#about">
              <Button variant="outlined" color="secondary" size="small">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    )

    const service_introduction = (
      <Grid item className="home-introduction">
        <div className="banners">
          <p className="bannerTitle" >
            <b>Effortless Event Planning</b>
          </p>
    
          <div className="bannerButton">
            <Link href="/discover-events">
              <Button variant="contained" color="primary" size="large">
                Find Events
              </Button>
            </Link>
          </div>
    
          <div className="bannerButton">
            <Link href="#about">
              <Button variant="outlined" color="secondary" size="small">
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
        <div className="home-sub-blue">
          <Grid item sm={12} xs={12}>
            <p className="subBannerTitle">
              <p>DISCOVER</p>
            </p>
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
                        <p className="white-text" className="discover-icon-text">{cat[0]}</p>
                      </Grid>
                      </Link>
                </Grid>
            ))}
          </Grid>

          <div className="subBannerButton">
            <Link href="/discover">
              <Button variant="outlined" color="secondary">
                Discover More
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    )

    let conditional_discover = client_discover;

    let stay_updated_button = this.state.isSubmitted ? 
        <p>Thank you! We will keep you updated!</p> 
        : 
        <Button
            variant="contained"
            color="primary"
            onClick={this.onSubmitForm}
            >
            Join
        </Button>

    let homepage_contents = (
      <div className="homePage">
          <Grid container spacing={0}>
            {conditional_introduction}
            <Grid container align="center">
              <div id="about" className="home-sub-white">
                <Grid item sm={12} xs={12}>
                  <p className="subBannerTitle">
                    <p>ABOUT PARTI</p>
                  </p>
                </Grid> 

                <Grid item sm={12} xs={12} align="center" className="about-text-xs">
                  <p>
                    Hosting an event is stressful. Parti will assist you in finding professional 
                    services and make the event planning process easy. 
                  </p>
                  <p>
                    Are you a vendor? Parti enables you to directly seek customers. See who is in 
                    need of your services nearby.
                  </p>
                </Grid>
    
                <Grid item sm={12} xs={12} align="center" className="about-text-sm">
                  <p>
                    Hosting an event is stressful. Parti will assist you in finding professional 
                    services and make the event planning process easy. 
                  </p>
                  <p>
                    Are you a vendor? Parti enables you to directly seek customers. See who is in 
                    need of your services nearby.
                  </p>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <div className="subBannerButton">
                    <Link href="/about">
                      <Button variant="outlined" color="primary">
                        About Us
                      </Button>
                    </Link>
                  </div>
                </Grid>
              </div>
            </Grid>

            {/*Discover*/}   
            {conditional_discover}     

            {/*Stay Updated*/}
            <Grid container align="center">
              <div className="home-sub-white">
                <p className="subBannerTitle">
                  <p>STAY UPDATED</p>
                </p>
                <div>
                  <p> Enter your email to get updates about Parti.</p>
                  <p> Vendor? Be sure to add your company name.</p>
                </div>
                <div className="beta-form">
                    <TextField
                        label="Email" 
                        variant="outlined" 
                        size="small" 
                        name='email'
                        required='true'
                        fullWidth
                        onChange={this.eventChange}
                        value={this.state.email}
                        className="text-field"
                        />
                    <div className="seperator" />
                      <TextField
                          label="Company (optional)" 
                          variant="outlined" 
                          size="small" 
                          name='company'
                          fullWidth
                          onChange={this.eventChange}
                          value={this.state.company}
                          className="text-field"
                          />
                    <div className="seperator" />
                    <div className="home-newsletter-button">
                      {stay_updated_button}
                    </div>
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
