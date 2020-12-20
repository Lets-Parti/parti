import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import aaricportrait from './imgs/aaricportrait.jpg';
import maxportrait from './imgs/maxportrait.jpg';
import jakeportrait from './imgs/jakeportrait.jpg';
import matthewportrait from './imgs/matthewportrait.jpg';
import anishportrait from './imgs/anishportrait.jpg';

const portraits = [matthewportrait, anishportrait, jakeportrait, aaricportrait, maxportrait];

const useStyles = makeStyles((theme) => ({
  intro: {
    fontFamily: '"Roboto", sans-serif',
    margin: '1rem',
    textAlign: "center"
  },
  portrait: {
    borderRadius: '50%',
    display: 'block',
    width: '60%',
    margin: 'auto'
  },

  aboutContainer: {
      width: 300,
      borderRadius: 5,
      border: '1px solid #cd72b4',
      padding: 15,
  }
}));

function AboutNoBio(props) {
  const classes = useStyles(); 

  return (
    <div>
      <div className={classes.intro}>
        <Grid container className={classes.aboutContainer} align="center">
            <Grid item sm={12} xs={12}>
              <img className={classes.portrait} src={portraits[props.num]}></img>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={12}>
             <h3>{props.name}</h3>
            </Grid>
            <Grid item sm={12} xs={12}>
             <h3>{props.title}</h3>
            </Grid>
            <Grid item sm={12} xs={12}>
              {props.from}
            </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default AboutNoBio;