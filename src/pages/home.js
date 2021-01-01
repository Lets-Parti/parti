import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import bgwavy from '../resources/backgrounds/bgwavy.png'
import graphicdemo from '../resources/backgrounds/demos.png'
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import '../stylesheets/home.css'
import '../stylesheets/common.css'

// const useStyles = makeStyles((theme) => ({
//   intro: {
//     backgroundImage: `url(${bgwavy})`,
//     backgroundPosition: 'left',
//     backgroundPositionY: 40,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: '100%',
//     width: '100%',
//     height: '1000px', 
//     fontFamily: '"Nunito", sans-serif',
//   }, 
//   graphicdemo: {
//     backgroundImage: `url(${graphicdemo})`,
//     backgroundPosition: 'left',
//     backgroundPositionY: 0,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: '100%',
//     width: '100%',
//     height: '1000px', 
//     fontFamily: '"Nunito", sans-serif',
//   },
//   introtext: {
//     paddingTop: theme.spacing(5), 
//     paddingLeft: theme.spacing(10)
//   },
//   banner: {
//     fontSize: '3rem', 
//     margin: 0
//   },
//   banner_pitch: {
//     fontSize: '1.25rem', 
//     marginTop: 15,
//     color: '#505F98'
//   }, 
//   banner_description: {
//     marginTop: 20,
//     color: '#505F98', 
//     lineHeight: 2
//   },
//   buttons: {
//     marginTop: '50px'
//   }
// }));

// function IntroText(){
//   const classes = useStyles(); 

//   return(
//     <div className={classes.introtext}>
//       <h1 className={classes.banner}>Effortless Event Planning</h1>

//       <p className={classes.banner_pitch}>Manage all of your event's needs in 1 app</p> 
//       <p className={classes.banner_description}>Need a DJ for your party? A photographer for your wedding? Parti will help you find the perfect services. Start by creating your first event!</p>

//       <div className={classes.buttons}>
//         <Button
//             variant="contained"
//             color="primary"
//             onClick={createEventButtonClick}
//             >
//             Create Event
//         </Button>
//       </div>
//     </div>
//   )
// }




class Home extends React.Component {
  constructor()
  {
    super(); 
    this.state = {

    }
  }

  render()
  {
    return (
      <div>
        <div className="homePage">
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12}>
            <div className="home-introduction">
                <div className="banners">
                  <p className="bannerTitle"><b>Effortless Event Planning</b></p>
                  <p className="bannerPitch">Manage all of your event's needs in 1 app</p>
                  <p className="bannerDescription">Need a DJ for your party? A photographer for your wedding? Parti will help you find the perfect services. Start by creating your first event!</p>

                  <div className="bannerButton">
                    <Link href="/events/new">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.createEventButtonClick}
                      >
                        Create an Event
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="bannerButton">
                    <Link href="/about">
                      <Button 
                        variant="outlined"
                        color="primary"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>

                </div>

                <div>

                </div>
                
            </div>
          </Grid>
          
          <Grid item sm={12} xs={12}>

          </Grid>
        </Grid>
        </div>
      </div>
    )
  }
}

export default Home;