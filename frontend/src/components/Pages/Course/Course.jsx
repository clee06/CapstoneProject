import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Hero from "../../General/Hero/Hero";
import Table from "./ClassTable/Table";
import MembersList from "../Institute/MembersList/MembersList";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ClassPopup from "./Create/ClassPopup";
import UserListPop from "../Tabs/UserListPop";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
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
}));

function Course(props) {
  const { courseID } = props.match.params;
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [course, setCourse] = useState({});

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/course/${courseID}`)
      .then(({ data }) => {
        setCourse(data.baseDetails);
        setAllUsers(data.listOfAllUsers);
        setStudent(data.listOfStudents);
        setTeacher(data.listOfTeachers);
        setTableData(data.listOfClasses);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [courseID]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        {/* -------------------------------------------------- Section 1 ---------------------------------------------- */}
        <div className="section-1 container" style={{ marginBottom: "1em" }}>
          <Hero
            name={course.name}
            overview={course.overview}
            buttonTitle="Get Started"
            picture={course.picture}
            scroll="#classroom-table"
          />
        </div>
        <Grid container>
          <Grid container style={{ marginBottom: "2em" }}>
            <UserListPop students={student} teachers={teacher} admins={[]} />
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
          <MembersList
            user={allusers}
            username={allusers.username}
            picture={allusers.picture}
          />
          <Typography
            variant="h3"
            style={{
              fontWeight: 500,
              marginLeft: "0.5em",
            }}
          >
            Add Members
          </Typography>
        </Grid>
        {/* -------------------------------------------------- Section 2 -------------------------------------------------- */}
        <div
          className="section-2 container"
          id="classroom-table"
          style={{ paddingTop: "5em" }}
        >
          <Typography
            variant="h3"
            style={{ textAlign: "center", fontWeight: 500, fontSize: "4rem" }}
          >
            Classrooms
          </Typography>
          <Grid container justify="center">
            <ClassPopup buttonName="Create" title="Create Your Class" courseID={courseID} />
          </Grid>

          <Table classData={tableData} />
        </div>
      </Container>
    </div>
  );
}

export default withRouter(Course);
