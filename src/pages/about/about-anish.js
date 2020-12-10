import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import anishportrait from './imgs/aaricportrait.jpg';

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
            <p className={classes.aboutmetext}>Anish is a exquisite man!</p>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default AboutAnish;
