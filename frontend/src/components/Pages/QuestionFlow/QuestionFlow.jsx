import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  InputBase,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useBorderedInputBaseStyles } from "@mui-treasury/styles/inputBase/bordered";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard";
// import QuestionInfo from "../../Data/Question/Question";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

export default function QuestionFlow() {
  const classes = useStyles();
  const styles = useBorderedInputBaseStyles();

  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const [question, setQuestion] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/search")
      .then(({data}) => {
        console.log("This is my data ", data);
        setQuestion(data.baseDetails[0]);
        setUsers(data.userDetails);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container justify="center">
          <Typography variant="h2" style={{ fontWeight: 500, fontSize: "5em" }}>
            QuestionFlow
          </Typography>
        </Grid>
        <Grid container justify="center">
          <InputBase
            classes={styles}
            style={{
              width: "80%",
              margin: "2rem 0",
              backgroundColor: "#121212",
            }}
            placeholder={"Search Questions"}
            startAdornment={<SearchIcon />}
          />
        </Grid>
        <Grid container justify="center">
          {/* <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChecked}
                  name="checked"
                />
              }
              label="Secondary"
            />
          </FormGroup> */}
        </Grid>
        <Grid container justify="center">
          <Link to="/askquestion" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Ask Question
            </Button>
          </Link>
        </Grid>
        <Grid container spacing={4} style={{ marginTop: "3em" }}>
          {question.map((info) => (
            <Grid item xs={12} key={info.id}>
              <Link
                to={`/question/${info.id}`}
                style={{ textDecoration: "none" }}
              >
                <QuestionCard
                  title={info.title}
                  tags={info.tags}
                  votes={info.votes}
                  // comment={info.comment}
                  user={info.users}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
