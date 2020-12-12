import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import anishportrait from './imgs/anishportrait.jpg';

const useStyles = makeStyles((theme) => ({
  intro: {
    fontFamily: '"Roboto", sans-serif',
    margin: '1rem'
  },
  portrait: {
    borderRadius: '50%',
    display: 'block',
    width: '60%',
    margin: 'auto'
  },
}));

function AboutAnish() {
  const classes = useStyles(); 

  return (
    <div>
      <div className={classes.intro}>
        <Grid container>
          <Grid item sm={3} xs={12}>
            <img className={classes.portrait} src={anishportrait}></img>
          </Grid>
          <Grid item sm={9} xs={12}>
            <p className={classes.aboutmetext}>Anish Agarwal is an original co-founder of Parti. He is currently studying Computer Science at Arizona State Univerity (Barrett, the Honors College) and will graduate in May 2023. He grew up and went to high school in Chandler, Arizona, where he became good friends with some of the other co-founders, Max and Matthew. He gained inspiration to create Parti as a service that simplifies event planning as well as client management within the event entertainment industry from his own experiences running a DJ company in the Arizona valley. He started DJing professionally, co-founded his own company, 808Hertz Entertainment LLC, along with Matthew, and began his entrepreneurial experience as early as high school. Aside from DJing, his hobbies include producing music, playing the guitar, working out, gaming, playing sports with friends, and following sporting events. Anish works across the board as a software developer, marketer, and operations director to help grow Parti to the next level! </p>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default AboutAnish;
