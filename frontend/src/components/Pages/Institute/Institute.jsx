import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import Cards from "../../General/Cards/Cards";
import Hero from "../../General/Hero/Hero";
import MembersList from "./MembersList/MembersList";
import { withRouter } from "react-router-dom";
import axios from "axios";
import UserListPop from "../Tabs/UserListPop";
import CoursePopup from "./Create/CoursePopup";

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
  hero_image: {
    paddingTop: "3rem",
    maxWidth: "45rem",
    width: "100%",
    height: "auto",
  },
  heading_hero: {
    fontWeight: 700,
    paddingTop: "6rem",
  },
  hero2_title: {
    padding: "1em 0 2em",
    fontWeight: 500,
  },
}));

function Institute(props) {
  const classes = useStyles();
  const { institutionID } = props.match.params;
  const [institution, setInstitution] = useState({});
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log(institutionID);
    axios
      .get(`http://localhost:8080/institution/${institutionID}`)
      .then(({ data }) => {
        console.log(data);
        setInstitution(data.baseDetails);
        setAdmin(data.listOfAdmins);
        setStudent(data.listOfStudents);
        setTeacher(data.listOfTeachers);
        setCourses(data.listOfCourses);
      })
      .catch((err) => console.error(err));
  }, [institutionID]);

  const editClick = () =>
    setInstitution({
      ...institution,
      picture: "https://i.imgur.com/Uvp8koV.jpg",
    });

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        {/* -------------------------------------------------- Section 1 -------------------------------------------------- */}
        <div className="section-1">
          <Hero
            name={institution.name}
            overview={institution.overview}
            picture={institution.picture}
            buttonTitle="Get Started"
            scroll="#card-container"
            handleEditClick={editClick}
          />
          <Grid container style={{ margin: "1em 0" }}>
            <UserListPop students={student} teachers={teacher} admins={admin} />
            <Typography
              variant="h3"
              style={{
                fontWeight: 500,
                marginLeft: "0.5em",
              }}
            >
              Members
            </Typography>
          </Grid>

          <Grid container>
            <MembersList
              user={student}
              username={student.username}
              picture={student.picture}
            />
            <Typography
              variant="h3"
              style={{
                fontWeight: 500,
                marginLeft: "0.5em",
              }}
            >
              Add Users
            </Typography>
          </Grid>
        </div>

        {/* -------------------------------------------------- Section 2 -------------------------------------------------- */}
        <div
          className="section-2"
          id="card-container"
          style={{ paddingTop: "2em" }}
        >
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h3" className={classes.hero2_title}>
                ― Courses To Get You Started ―
                <Grid container justify="center">
                  <CoursePopup buttonName="Create" title="Create Your Course" institutionID={institutionID} />
                </Grid>
              </Typography>
              <Grid item></Grid>
            </Grid>
          </Grid>
          {/* ------------------------ Card -------------------------- */}
          <Grid container spacing={5} justify="center">
            {courses.map((info) => (
              <Grid item md={4} sm={6} key={info.id}>
                <Cards {...info} title="course" />
              </Grid>
            ))}
          </Grid>
        </div>
        {/* -------------------------------------------------- Section 3 -------------------------------------------------- */}
        <div className="section-3"></div>
      </Container>
    </div>
  );
}

export default withRouter(Institute);
