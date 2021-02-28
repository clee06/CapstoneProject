import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Cards from "../../General/Cards/Cards";
import InstitutePopup from "./Create/InstitutePopup";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      padding: "0 2rem",
      fontSize: "12px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "0 2rem",
      fontSize: "14px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "0 3rem",
      fontSize: "15px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0 4rem",
      fontSize: "16px",
    },
  },
  createButton: {
    background: "linear-gradient(to top, #638ef0, #82e7fe)",
    "& > *": {
      textTransform: "none !important",
    },
  },
}));

export default function Explore() {
  const classes = useStyles();
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/explore")
      .then(({ data }) => setInstitutions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container
      maxWidth="xl"
      className={classes.root}
      style={{ paddingTop: "4em" }}
    >
      <div>
        <Typography variant="h2" style={{ fontWeight: 500, fontSize: "5em" }}>
          Institutions
        </Typography>
        <InstitutePopup buttonName="Create" title="Create Your Institute" />
        <Grid container justify="center">
        <Typography
          variant="h3"
          style={{ fontWeight: 300, padding: "1.5em 0 1em" }}
        >
         ― Let's Get Started ―
        </Typography>
        </Grid>
        {/* ------------------------ Card -------------------------- */}
        <Grid container spacing={5} justify="center">
          {institutions.map((info) => (
            <Grid item md={4} sm={6} key={info.id}>
              <Cards {...info} title="institution" />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
