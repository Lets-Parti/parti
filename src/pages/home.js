import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/footer'
import bgwavy from '../resources/backgrounds/bgwavy.png'
import graphicdemo from '../resources/backgrounds/demos.png'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  intro: {
    backgroundImage: `url(${bgwavy})`,
    backgroundPosition: 'left',
    backgroundPositionY: 40,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '100%',
    height: '1000px', 
    fontFamily: '"Roboto", sans-serif',
  }, 
  graphicdemo: {
    backgroundImage: `url(${graphicdemo})`,
    backgroundPosition: 'left',
    backgroundPositionY: 0,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '100%',
    height: '1000px', 
    fontFamily: '"Roboto", sans-serif',
  },
  introtext: {
    paddingTop: theme.spacing(5), 
    paddingLeft: theme.spacing(10)
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
    marginTop: 20,
    color: '#505F98', 
    lineHeight: 2
  },
  buttons: {
    marginTop: '50px'
  }
}));

function IntroText(){
  const classes = useStyles(); 

  return(
    <div className={classes.introtext}>
      <h1 className={classes.banner}>Effortless Event Planning</h1>

      <p className={classes.banner_pitch}>Manage all of your event's needs in 1 app</p> 
      <p className={classes.banner_description}>Need a DJ for your party? A photographer for your wedding? Parti will help you find the perfect services. Start by creating your first event!</p>

      <div className={classes.buttons}>
        <Button
            variant="contained"
            color="primary"
            onClick={createEventButtonClick}
            >
            Create Event
        </Button>
      </div>
    </div>
  )
}

function createEventButtonClick()
{
  window.location.href = '/create-event'
}

function GraphicDemo(){
  const classes = useStyles(); 
  
  return(
    <div className={classes.graphicdemo}></div>
  )
}


function Home() {
  const classes = useStyles(); 

  return (
    <div>
      <div className={classes.intro}>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <IntroText />
        </Grid>
        <Grid item sm={6} xs={12}>
          <GraphicDemo />
        </Grid>
      </Grid>
      </div>

      <Footer />
    </div>
  )
}

export default Home;