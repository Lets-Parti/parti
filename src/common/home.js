import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Navbar from '../components/navbar';
import ButtonClear from '../components/button-clear';
import ButtonFill from '../components/button-fill'; 


import bgwavy from '../resources/backgrounds/bgwavy.png'
import logo from '../resources/logos/appicon.png'
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  intro: {
    backgroundImage: `url(${bgwavy})`,
    backgroundPosition: 'left',
    backgroundPositionY: 40,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '100%',
    height: '1000px', 
    fontFamily: '"Roboto", sans-serif'
  }, 
  introtext: {
    padding: theme.spacing(4), 
    display: 'inline-block'
  },
  banner: {
    fontSize: '3rem', 
    margin: 0
  },
  banner_pitch: {
    fontSize: '1.25rem', 
    marginTop: 15,
    color: '#505F98'
  }, 
  banner_description: {
    marginTop: 40,
    color: '#505F98'
  }
}));

function Home() {
  const classes = useStyles(); 

  return (
    <div>
      <Navbar />
      
      <div className={classes.intro}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <IntroText />
        </Grid>
        <Grid item xs={6}>
          (Insert Graphic Demos here )
        </Grid>
      </Grid>

      </div>
    </div>
  )
}

function IntroText(){
  const classes = useStyles(); 

  return(
    <div className={classes.introtext}>
      <h1 className={classes.banner}>Effortless Event Planning</h1>

      <p className={classes.banner_pitch}>Find everything you neeed for your event in 1 app</p> 
      <p className={classes.banner_description}>Need a DJ for your party? A photographer for your wedding? Parti will help you find the perfect services. Start by 
          creating an event below
      </p>


      <ButtonFill text='Create an Event' />
      <ButtonClear text='Learn More' />
    </div>
  )
}

export default Home;