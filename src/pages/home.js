import "../stylesheets/common.css";
import "../stylesheets/home.css";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Carousel from "react-material-ui-carousel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import PhotoIcon from "@material-ui/icons/Photo";
import React from "react";

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AlbumIcon from '@material-ui/icons/Album';
import PetsIcon from '@material-ui/icons/Pets';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import PaletteIcon from '@material-ui/icons/Palette';
import BrushIcon from '@material-ui/icons/Brush';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';

const discoverCategories = [
  ["Photography", <PhotoCameraIcon />],
  ["DJ", <AlbumIcon />],
  ["Florist", <LocalFloristIcon />],
  ["Food Catering", <LocalDiningIcon />],
  ["Petting Zoo", <PetsIcon />],
  ["Comedian", <EmojiEmotionsIcon />],
  ["Magician", <BrushIcon />],
  ["Decorator", <PaletteIcon />]
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
            </Grid>

            {/*Discover*/}

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

            {/*About Us*/}

            <Grid container align="center">
              <div className="home-sub-white">
                <p className="subBannerTitle">
                  <b>ABOUT PARTI</b>
                </p>

                <p className="home-about-parti">
                  Hosting an event is stressful. Parti will assist you in finding professional 
                  services and make the event planning process easy. 

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
      </div>
    );
  }
}

export default Home;
