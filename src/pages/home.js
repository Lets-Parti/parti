import "../stylesheets/common.css";
import "../stylesheets/home.css";
import "../stylesheets/beta.css";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import React from "react";
import TextField from '@material-ui/core/TextField';
import {withStyles } from "@material-ui/core/styles";


import DJIcon from '../resources/icons/dj.png';
import PhotoIcon from '../resources/icons/photo.png'; 
import ComedianIcon from '../resources/icons/comedian.png'; 
import MagicIcon from '../resources/icons/magic.png';
import PlaceIcon from '../resources/icons/place.png';
import LanternIcon from '../resources/icons/lantern.png';
import BuffetIcon from '../resources/icons/buffet.png'; 
import MonkeyIcon from '../resources/icons/monkey.png';

import frame_seven from '../resources/cards/frame7.png'
import frame_eight from '../resources/cards/frame8.png'
import frame_nine from '../resources/cards/frame9.png'
import frame_ten from '../resources/cards/frame10.png'

import ScrollContainer from 'react-indiana-drag-scroll'
import AboutNoBio from './about/about-nobio';

import { connect } from 'react-redux'
import { createEvent } from '../redux/actions/dataActions'
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
const styles = theme => ({
  homeButton:{
    fontFamily: "Montserrat, sans-serif",
    textTransform: 'none',
    fontWeight: '600',
    textAlign: 'center'
  }
})
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
      const uniqueID = this.props.match.params.uniqueID; 
      if(uniqueID){
         firebaseAnalytics.logEvent(`outreach_clicked_${uniqueID}`);
      }
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
    const {classes}=this.props;
    let authenticatedUser;
    if (authenticated) {
      authenticatedUser = this.props.user.user;

      const PartiEventData = localStorage.PartiEventData
      if(PartiEventData)
      {
        try{
          let data = JSON.parse(PartiEventData); 
          this.props.createEvent(data, this.props.history);
          localStorage.removeItem("PartiEventData"); 
        }catch (err)
        {
          alert("Something went wrong with creating an event.");
        }
      }
    }

    const frames_vendors = [frame_seven, frame_eight]; 
    const frames_clients = [frame_nine, frame_ten];
  
    // Conditional Introduction Section of Homepage
    const client_introduction = (
      <Grid item sm={12} xs={12} className="home-introduction" align="left">
        <div className="banners">
          <p className="bannerTitle" >
            Connect with Arizona's best event services. 
          </p>
    
          <p className="bannerPitch">Start by creating an event. Tell us what services you're looking for, and we will take care of the rest. <b>It only takes 5 minutes.</b></p>

          <div className="bannerButton">
            <Link href="/events/new">
              <Button className={classes.homeButton}  variant="contained" color="primary" size="large">
                Create an Event
              </Button>
            </Link>
          </div>

          <Link href="/signup/vendor" >
            <p className="darkText"><u>Are you a vendor? List yourself here</u></p>
          </Link>
          <div className="bannerButton">
            <Link href="#about">
              <Button className={classes.homeButton}  variant="outlined" color="secondary" size="medium">
                What's Parti?
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
              <Button className={classes.homeButton}  variant="contained" color="primary" size="large">
                Find Events
              </Button>
            </Link>
          </div>
    
          <div className="bannerButton">
            <Link href="#about">
              <Button className={classes.homeButton}  variant="outlined" color="secondary" size="small">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    )

    // Conditional Discover Section of Homepage
    const client_discover = (
      <Grid container align="center">
        <div className="home-sub-blue">
          <Grid item sm={12} xs={12}>
            <p className="subBannerTitle">
              <p>FIND VENDORS</p>
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
              <Button className={classes.homeButton}  variant="outlined" color="secondary">
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
        <Button className={classes.homeButton} 
            variant="contained"
            color="primary"
            onClick={this.onSubmitForm}
            >
            Keep Me Updated!
        </Button>

    let homepage_contents = (
      <div className="homePage">
          <Grid container spacing={0}>
            {client_introduction}
            <Grid container align="center">
              <div id="about" className="home-sub-white">
                <Grid item sm={12} xs={12}>
                  <p className="subBannerTitle">
                    <p>ABOUT PARTI</p>
                  </p>
                </Grid> 

                <Grid item sm={12} xs={12} align="left" className="about-text-xs">
                  <p>
                  <b>Thinking of hosting an event?</b> Finding a vendor is time consuming and stressful. 
                  Tell us what services you're looking for by <Link href="/events/new">creating an event</Link>. We will
                  connect you with the best vendors that suit your needs. The entire process only takes 5 minutes. 
                  </p>
                  <Grid className="indiana-scroll" align="center">
                    <ScrollContainer className="scroll-container" horizontal hideScrollbars >
                    {frames_clients.map(frame => 
                    (
                        <div className="indiana-frame">
                            <img src={frame} className="indiana-frame-picture" alt="Indiana Frame"/>
                        </div>
                    ))
                    }
                    </ScrollContainer>
                  </Grid>
                  <p>
                    <b>Are you a vendor?</b> Parti enables you to directly seek customers. See who is in 
                    need of your services nearby.
                  </p>
                  <Grid className="indiana-scroll" align="center">
                    <ScrollContainer className="scroll-container" horizontal hideScrollbars >
                    {frames_vendors.map(frame => 
                    (
                        <div className="indiana-frame">
                            <img src={frame} className="indiana-frame-picture" alt="Indiana Frame"/>
                        </div>
                    ))
                    }
                    </ScrollContainer>
                  </Grid>
                </Grid>
    
                <Grid item sm={12} xs={12} align="left" className="about-text-sm">
                  <p>
                    <b>Thinking of hosting an event?</b> Finding the perfect vendor for your upcoming event can be time consuming and stressful. 
                  Tell us what services you're looking for by <Link href="/events/new">creating an event</Link>. Once you create an event, we will
                  connect you with the best vendors that suit your needs. The entire process only takes 5 minutes. 
                  </p>

                  <Grid className="indiana-scroll" align="center">
                    <ScrollContainer className="scroll-container" horizontal hideScrollbars >
                    {frames_clients.map(frame => 
                    (
                        <div className="indiana-frame">
                            <img src={frame} className="indiana-frame-picture" alt="Indiana Frame"/>
                        </div>
                    ))
                    }
                    </ScrollContainer>
                  </Grid>

                  <p>
                    <b>Are you a vendor?</b> We enable you to see who is in need of your services. Build your digital
                    storefront and start generating leads with Parti. <Link href="/signup/vendor">Join the Parti community today!</Link>
                  </p>

                  <Grid className="indiana-scroll" align="center">
                    <ScrollContainer className="scroll-container" horizontal hideScrollbars >
                    {frames_vendors.map(frame => 
                    (
                        <div className="indiana-frame">
                            <img src={frame} className="indiana-frame-picture" alt="Indiana Frame"/>
                        </div>
                    ))
                    }
                    </ScrollContainer>
                  </Grid>
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
  user: PropTypes.object.isRequired,
  createEvent: PropTypes.func.isRequired, 
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user
})

const mapActionsToProps = {
  createEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Home));
