import React from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Footer from "../components/footer";
import bgwavy from "../resources/backgrounds/bgwavy.png";
import graphicdemo from "../resources/backgrounds/demos.png";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import PhotoIcon from "@material-ui/icons/Photo";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  intro: {
    backgroundImage: `url(${bgwavy})`,
    backgroundPosition: "left",
    backgroundPositionY: 40,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    width: "100%",
    height: "1000px",
    fontFamily: '"Nunito", sans-serif',
  },
  graphicdemo: {
    backgroundImage: `url(${graphicdemo})`,
    backgroundPosition: "left",
    backgroundPositionY: 0,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    width: "100%",
    height: "1000px",
    fontFamily: '"Nunito", sans-serif',
  },
  introtext: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(10),
  },
  banner: {
    fontSize: "3rem",
    margin: 0,
  },
  banner_pitch: {
    fontSize: "1.25rem",
    marginTop: 15,
    color: "#505F98",
  },
  banner_description: {
    marginTop: 20,
    color: "#505F98",
    lineHeight: 2,
  },
  buttons: {
    marginTop: "50px",
  },
  rounded: {
    backgroundColor: "#E9E9E9",
  },
}));

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: "Nunito",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "40px",
      lineHeight: "30px",
    },
    body1: {
      fontFamily: "Nunito",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "30px",
    },
    body2: {
      fontFamily: "Nunito",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "26px",
    },
  },
});

function IntroText() {
  const classes = useStyles();

  return (
    <div className={classes.introtext}>
      <h1 className={classes.banner}>Effortless Event Planning</h1>

      <p className={classes.banner_pitch}>
        Manage all of your event's needs in 1 app
      </p>
      <p className={classes.banner_description}>
        Need a DJ for your party? A photographer for your wedding? Parti will
        help you find the perfect services. Start by creating your first event!
      </p>

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
  );
}

function Discover() {
  const classes = useStyles();
  return (
    <Box bgcolor="#FFFFFF" p={2} mb="90px">
      {/* <Grid container> */}
      {/* <Box m={8}/> */}
      <Grid container alignItems="center" justify="center">
        <Box mt="106px" mb="97px">
          <ThemeProvider theme={theme}>
            <Typography variant="h1">DISCOVER</Typography>
          </ThemeProvider>
        </Box>
      </Grid>

      <Grid container direction="column" spacing={3} alignContent="flex-start">
        <Grid container item justify="space-evenly">
          <Grid container item xs={3} wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar variant="rounded" className={classes.rounded}>
                <PhotoIcon color="primary" />
              </Avatar>
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="body1">Photographer</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Grid container item xs={3} wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar variant="rounded" className={classes.rounded}>
                <PhotoIcon color="primary" />
              </Avatar>
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="body1">Wedding Planner</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Grid container item xs={3} wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar variant="rounded" className={classes.rounded}>
                <PhotoIcon color="primary" />
              </Avatar>
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="body1">Birthday Party</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Grid container item xs={3} wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar variant="rounded" className={classes.rounded}>
                <PhotoIcon color="primary" />
              </Avatar>
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="body1">Singer</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>

        {/*Row 2 */}

        <Grid container item justify="space-evenly">
          <Grid container item xs={3} wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar variant="rounded" className={classes.rounded}>
                <PhotoIcon color="primary" />
              </Avatar>
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="body1">DJ</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Grid container item xs={3} wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar variant="rounded" className={classes.rounded}>
                <PhotoIcon color="primary" />
              </Avatar>
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="body1">Henna/Tatoo Artists</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Grid container item xs={3} wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar variant="rounded" className={classes.rounded}>
                <PhotoIcon color="primary" />
              </Avatar>
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="body1">Dancers</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Grid container item xs={3} wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar variant="rounded" className={classes.rounded}>
                <PhotoIcon color="primary" />
              </Avatar>
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="body1">All Events</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>

        
        <Box mt="60px" />
        <Grid container item xs={3} justify="space-between">
          
          <Link href="/discover">
            <Button variant="outlined">
              <ThemeProvider theme={theme}>
                <Typography variant="body2">Discover More</Typography>
              </ThemeProvider>
            </Button>
          </Link>

          {/* </Box> */}
        </Grid>
      </Grid>

      {/* </Grid> */}
    </Box>
  );
}

function createEventButtonClick() {
  window.location.href = "/events/new";
}

function GraphicDemo() {
  const classes = useStyles();

  return <div className={classes.graphicdemo}></div>;
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

      <Discover />

      <Footer />
    </div>
  );
}

export default Home;
