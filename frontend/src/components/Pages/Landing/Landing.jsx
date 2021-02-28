import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, Button, Hidden } from "@material-ui/core";
import { Favorite, EmojiEmotions, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "16px",
    [theme.breakpoints.up("xs")]: {
      padding: "0 2rem",
      fontSize: "11px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "0 2rem",
      fontSize: "12px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "0 3rem",
      fontSize: "14px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0 4rem",
      fontSize: "16px",
    },
  },
  container: {
    margin: "2em 0 7em",
  },
  mainTypo: {
    marginTop: "1em",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  bigTypo: {
    fontWeight: 500,
    marginBottom: "0.5em",
    fontSize: "4em",
  },
  midTypo: {
    marginBottom: "1em",
    fontWeight: 500,
    fontSize: "2.2rem",
  },
  mainBody: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  icon: {
    fontSize: "7em",
    margin: "2rem 0",
  },
}));

export default function Landing() {
  const classes = useStyles();

  // useEffect(()=>{
  //   fetch(`http://localhost:8080`)
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }, [])

  return (
    <Container maxWidth="xl" className={classes.root}>
      {/* ----------------------------------- Section 1 ------------------------------------------------ */}
      <div className={classes.container}>
        <Grid container>
          <Grid item lg={6} md={5} sm={12}>
            <Typography
              variant="h2"
              style={{
                fontWeight: 700,
                fontSize: "4.5em",
                paddingTop: "0.5em",
                letterSpacing: "2px",
              }}
              className={classes.mainTypo}
            >
              Every student can learn, just not the same way
            </Typography>
            <Hidden smDown>
              <Typography
                variant="body1"
                // align="justify"
                style={{ width: "85%", margin: "2em 0" }}
                className={classes.mainBody}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum
                dolor sit amet, consectetur adipiscing elit
              </Typography>
            </Hidden>
            <Hidden mdDown>
              <Link to="/explore" style={{ textDecoration: "none" }}>
                <Button color="primary" variant="contained">
                  Explore
                </Button>
              </Link>
            </Hidden>
          </Grid>
          {/* <Grid container justify="center"> */}
          <Grid item lg={6} md={7} sm={12}>
            <p style={{ textAlign: "center" }}>
              <img
                src="./img/background/hero.png"
                alt="background"
                style={{
                  padding: "3em auto 0",
                  maxWidth: "50em",
                  width: "100%",
                  height: "auto",
                }}
                className={classes.image}
              />
            </p>
          </Grid>
        </Grid>
        {/* </Grid> */}
        <Hidden mdUp>
          <Grid container justify="center">
            <Typography
              variant="body1"
              style={{ width: "85%", margin: "2em 0" }}
              align="center"
              // className={classes.mainBody}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum
              dolor sit amet, consectetur adipiscing elit
            </Typography>
          </Grid>
        </Hidden>
      </div>
      {/* ----------------------------------- Section 2 ------------------------------------------------ */}
      <div className={classes.container}>
        <Grid container justify="center">
          <Grid item>
            <Typography variant="h3" align="center" className={classes.bigTypo}>
              Collaborate with Students from Top Institutions
            </Typography>
          </Grid>
          <Grid item lg={8} md={9} sm={10}>
            <Typography
              variant="body1"
              align="justify"
              className={classes.smallTypo}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              consequat enim orci, ut finibus mauris venenatis ut. Vivamus in
              diam est. Proin varius lectus felis, sed tempor dolor faucibus at.
              Duis facilisis pretium est sit amet ornare. Duis lorem risus,
              varius a blandit quis, venenatis at ipsum.
            </Typography>
          </Grid>
        </Grid>
        <Hidden lgUp>
          <div style={{ textAlign: "center", paddingTop: "2em" }}>
            <Link to="/explore" style={{ textDecoration: "none" }}>
              <Button color="primary" variant="contained">
                Explore
              </Button>
            </Link>
          </div>
        </Hidden>
      </div>
      {/* ----------------------------------- Section 3 ------------------------------------------------ */}
      <div className={classes.container}>
        <Typography variant="h3" align="center" className={classes.bigTypo}>
          What makes our our collection one of a kind
        </Typography>
        <Grid
          container
          justify="space-around"
          spacing={7}
          alignContent="center"
        >
          <Grid item xl={3} md={4} sm={6} xs={10}>
            <div style={{ textAlign: "center" }}>
              <EmojiEmotions color="primary" className={classes.icon} />
            </div>
            <Typography variant="h4" align="center" className={classes.midTypo}>
              User Friendly
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              className={classes.smallTypo}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              consequat enim orci, ut finibus mauris venenatis ut. Vivamus in
              diam est. Proin varius lectus felis, sed tempor dolor faucibus at.
              Duis facilisis pretium est sit amet ornare.
            </Typography>
          </Grid>
          <Grid item xl={3} md={4} sm={6} xs={10}>
            <div style={{ textAlign: "center" }}>
              <Favorite color="primary" className={classes.icon} />
            </div>
            <Typography variant="h4" align="center" className={classes.midTypo}>
              Made With Love
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              className={classes.smallTypo}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              consequat enim orci, ut finibus mauris venenatis ut. Vivamus in
              diam est. Proin varius lectus felis, sed tempor dolor faucibus at.
              Duis facilisis pretium est sit amet ornare.
            </Typography>
          </Grid>
          <Grid item xl={3} md={4} sm={6} xs={10}>
            <div style={{ textAlign: "center" }}>
              <Edit color="primary" className={classes.icon} />
            </div>
            <Typography variant="h4" align="center" className={classes.midTypo}>
              User Friendly
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              className={classes.smallTypo}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              consequat enim orci, ut finibus mauris venenatis ut. Vivamus in
              diam est. Proin varius lectus felis, sed tempor dolor faucibus at.
              Duis facilisis pretium est sit amet ornare.
            </Typography>
          </Grid>
        </Grid>
      </div>

      {/* ------------------------------------- */}
      <div>
        <Grid container>
          <Typography variant="h3" className={classes.bigTypo} align="center">
            We’re your strategic learning partner to help move your skills
            forward
          </Typography>
        </Grid>
      </div>
    </Container>
  );
}
