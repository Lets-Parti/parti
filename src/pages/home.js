import "../stylesheets/common.css";
import "../stylesheets/home.css";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import bgwavy from "../resources/backgrounds/bgwavy.png";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Carousel from "react-material-ui-carousel";
import Footer from "../components/footer";
import graphicdemo from "../resources/backgrounds/demos.png";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import PhotoIcon from "@material-ui/icons/Photo";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Paper } from "@material-ui/core";
import React from "react";

const discoverCategories = [
  "Photographer",
  "Wedding Planner",
  "Birthday Party",
  "Singer",
  "DJ",
  "Henna/Tatoo Artists",
  "Dancers",
  "All Events",
];

const testimonials = [
  {
    name: "Person 1",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus laoreet velit tempus nam ullamcorper vulputate. Varius ligula bibendum cursus urna luctus velit ullamcorper etiam egestas."',
  },
  {
    name: "Person 2",
    description:
      '"Borem ipsum dolor sit amet, consectetur adipiscing elit. Netus laoreet velit tempus nam ullamcorper vulputate. Varius ligula bibendum cursus urna luctus velit ullamcorper etiam egestas."',
  },
];

const footer_links = [
  {
    text: "About Us",
    link: "/about",
  },
  {
    text: "Terms and Conditions",
    link: "/terms-and-conditions",
  },
  {
    text: "Privacy Policy",
    link: "/privacy",
  },
  {
    text: "Feedback",
    link: "/feedback",
  },
  {
    text: "FAQ",
    link: "/faq",
  },
  {
    text: "Contact Us",
    link: "/contact",
  },
];

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="homePage">
          <Grid container spacing={0}>
            {/*Introduction*/}

            <Grid item sm={12} xs={12}>
              <div className="home-introduction">
                <div className="banners">
                  <p className="bannerTitle">
                    <b>Effortless Event Planning</b>
                  </p>
                  <p className="bannerPitch">
                    Manage all of your event's needs in 1 app
                  </p>
                  <p>
                    Need a DJ for your party? A photographer for your wedding?
                    Parti will help you find the perfect services. Start by
                    creating your first event!
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

                <div></div>
              </div>
            </Grid>

            {/*Discover*/}

            <Grid container item sm={12} xs={12}>
              <div className="home-sub-black">
                <p className="subBannerTitle">
                  <b>DISCOVER</b>
                </p>

                <Grid container item justify="space-evenly" spacing={1}>
                  {discoverCategories.map((cat) => (
                    <Grid
                      container
                      item
                      xs={3}
                      wrap="nowrap"
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item>
                        <Avatar variant="rounded">
                          <PhotoIcon />
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <p>{cat}</p>
                      </Grid>
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

            {/*About Us*/}

            <Grid container item sm={12} xs={12}>
              <div className="home-sub-white">
                <p className="subBannerTitle">
                  <b>ABOUT US</b>
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus
                  laoreet velit tempus nam ullamcorper vulputate. Varius ligula
                  bibendum cursus urna luctus velit ullamcorper etiam egestas.
                  Donec ultricies interdum lorem ac quis orci porta egestas.
                  Ligula eget aliquam orci, feugiat velit nisi dictumst cras
                  malesuada.
                </p>

                <div className="subBannerButton">
                  <Link href="/about">
                    <Button variant="contained" color="primary">
                      More About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </Grid>

            <Grid container item sm={12} xs={12}>
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
            </Grid>

            <Grid container item sm={12} xs={12}>
              <div className="home-footer">
                <Grid container item justify="space-evenly">
                  {footer_links.map((item) => (
                    <Grid item>
                      <Link href={item.link} color="inherit">
                        <p className="footer-text">{item.text}</p>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
                <Box mt={1}/>
                
                <Grid container item justify="space-evenly" alignItems="center">
                  <Grid item>
                    <p className="footer-text">
                      &copy; 2020 Parti LLC. All Rights Reserved.
                    </p>
                  </Grid>
                  
                  <Grid item>
                    <Link href="https://www.instagram.com/parti.app/">
                      <InstagramIcon style={{ color: "black" }}/>
                    </Link>
                    <Link href="https://www.facebook.com/officialpartiapp">
                      <FacebookIcon style={{ color: "black" }}/>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
