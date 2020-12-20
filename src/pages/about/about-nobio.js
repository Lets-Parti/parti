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
        <Grid container sm={12} className={classes.aboutContainer}>
          <Grid item sm={12} xs={12}>
            <img className={classes.portrait} src={portraits[props.num]}></img>
          </Grid>
          <br></br>
          <h2>
          {props.name}
          </h2>
          <br></br>
          <h2>
          {props.title}
          </h2>
          <br></br>
          <p style={{textAlign:'center', align:'center'}}>
          {props.from}
          </p>
        </Grid>
      </div>
    </div>
  )
}

export default AboutNoBio;