import React from "react";
import { InputBase, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useBorderedInputBaseStyles } from "@mui-treasury/styles/inputBase/bordered";

const useStyles = makeStyles({
  title: {
    fontWeight: 300,
    fontSize: "2em",
  },
});

export default function CreateClass() {
  const styles = useBorderedInputBaseStyles();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Classroom Name
      </Typography>
      <InputBase
        classes={styles}
        style={{
          width: "100%",
          // color: "#fff",
          backgroundColor: "#343a40",
        }}
        placeholder="max characters: 35"
        required
        inputProps={{ maxLength: 35 }}
      />

      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1em",
        }}
      >
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Start Date
          </Typography>
          <InputBase
            type="date"
            classes={styles}
            style={{
              width: "100%",
              backgroundColor: "#343a40",
            }}
            required
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            End Date
          </Typography>
          <InputBase
            type="date"
            classes={styles}
            style={{
              width: "100%",
              backgroundColor: "#343a40",
            }}
            required
          />
        </Grid>
      </Grid>
    </div>
  );
}
