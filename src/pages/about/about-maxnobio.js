import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import maxportrait from './imgs/maxportrait.jpg';

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

function AboutMaxnobio() {
  const classes = useStyles(); 

  return (
    <div>
      <div className={classes.intro}>
        <Grid container>
          <Grid item sm={3} xs={12}>
            <img className={classes.portrait} src={maxportrait}></img>
          </Grid>
          <Grid item sm={9} xs={12}>
          Co-Founder, Lead Marketer & Design
          <Grid item sm={9} xs={12}>
          Chandler, AZ
          </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default AboutMaxnobio;
