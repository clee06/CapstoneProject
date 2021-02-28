import React from "react";
import ScrollToTop from "./components/General/ScrollToTop/ScrollToTop";
import Navbar from "./components/General/Navbar/Navbar";
import Landing from "./components/Pages/Landing/Landing";
import Explore from "./components/Pages/Explore/Explore";
import Institute from "./components/Pages/Institute/Institute";
import Course from "./components/Pages/Course/Course";
import QuestionFlow from "./components/Pages/QuestionFlow/QuestionFlow";
import CreateQuestion from "./components/Pages/QuestionCreate/CreateQuestion";
import PostQuestion from "./components/Pages/QuestionCreate/PostQuestion";
import IndividualQuestion from "./components/Pages/QuestionIndividual/IndividualQuestion";
import Profile from "./components/Pages/Profile/Profile";
import Copyright from "./components/General/Copyright/Copyright";
import Login from "./components/General/Login/Login";
import Signup from "./components/General/Signup/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Classroom from "./components/Pages/Classroom/Classroom";
import Chatroom from "./components/Pages/Chatroom/Chatroom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/explore" component={Explore} />
          Institute
          <Route path="/institution/:institutionID" component={Institute} />
          Courses
          <Route path="/course/:courseID" component={Course} />
          Other
          <Route path="/questionflow" component={QuestionFlow} />
          <Route path="/question/:questionID" component={IndividualQuestion} />
          <Route path="/askquestion" component={CreateQuestion} />
          <Route path="/postquestion" component={PostQuestion} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Signup} />
          <Route path="/myclass" component={Classroom} />
          <Route path="/chatroom" component={Chatroom} />
        </Switch>
        <Copyright />
      </div>
    </Router>
  );
}

export default App;
