import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/navbar'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({

}));

function About() {
  const classes = useStyles(); 

  return (
    <div>
        <Navbar />
        <p>(TODO: ABOUT PAGE)</p>
    </div>
  )
}

export default About;