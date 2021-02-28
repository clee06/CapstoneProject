const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const app = express();

//This stuff for socket.io
const http = require("http");
const server = http.createServer(app);
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));

// Landing Service
const LandingService = require("./services/LandingService");
const landingService = new LandingService(knex);

app.get("/explore", async (req, res) => {
  const institutions = await landingService
    .getInstitutions()
    .catch((err) => console.error(err));
  return res.json(institutions);
});

//Institution Mainpage - in this case :institution is the specific institution's ID in the database
const InstitutionService = require("./services/InstitutionService");
const institutionService = new InstitutionService(knex);

app.get("/institution/:institution", async (req, res) => {
  console.log("324732847328473289", req.params.institution);
  let institutionDetails = await institutionService
    .getInstitutionDetails(req.params.institution)
    .catch((err) => console.error(err));
  return res.json(institutionDetails);
});

//Course Mainpage - as above :course is the specific course's ID in the database
const CourseService = require("./services/CourseService");
const courseService = new CourseService(knex);

app.get("/course/:course", async (req, res) => {
  let courseDetails = await courseService
    .getCourseDetails(req.params.course)
    .catch((err) => console.error(err));
  return res.json(courseDetails);
});

//Class Mainpage - as above, :class is the specific class's ID in the database
const ClassService = require("./services/ClassService");
const classService = new ClassService(knex);

app.get("/class/:class", async (req, res) => {
  let classDetails = await classService
    .getClassDetails(req.params.class)
    .catch((err) => console.error(err));
  return res.json(classDetails);
});

//Account Page - as above, :name is the ID of that account holder in the database
const AccountService = require("./services/AccountService");
const accountService = new AccountService(knex);

app.get("/account/:name", async (req, res) => {
  let accountDetails = await accountService
    .getAccountDetails(req.params.name)
    .catch((err) => console.error(err));
  return res.json(accountDetails);
});

//Single Question Page - in this case, :question should be the question ID in the database
const QuestionService = require("./services/QuestionService");
const questionService = new QuestionService(knex);

app.get("/question/:question", async (req, res) => {
  let questionDetails = await questionService
    .getQuestionDetails(req.params.question)
    .catch((err) => console.error(err));
  return res.json(questionDetails);
});

//Search Page

const SearchService = require("./services/SearchService");
const searchService = new SearchService(knex);

app.get("/search", async (req, res) => {
  let searchDetails = await searchService
    .getSearchDetails(req.query.search)
    .catch((err) => console.error(err));
  return res.json(searchDetails);
});

//POST routes:

// Post - Need JWT details to figure out how to make the login and register work properly, skip over this for now.
const NewUsers = require("./services/PostRoutes/NewUsers");
const newUsers = new NewUsers(knex);

app.post("/register", (req, res) => {
  console.log("Post = ", req.body);
  return newUsers
    .register(req.body)
    .then("Login")
    .catch((err) => res.status(500).json(err));
});
app.post("/login");

//Changed all POST routes, so that they'd require ID instead of name - removed all ID finders on everything. Also converted everything to not needing to be logged in - User is automatically set as userID 1 - called 'test'

//Route for changing user details - Not sure how auth would happen, need to figure that out later for all POST routes
const PostAccounts = require("./services/PostRoutes/PostAccounts");
const postAccounts = new PostAccounts(knex);

app.post("/modifyuser", (req, res) => {
  console.log("Post = ", req.body);
  return postAccounts
    .modifyUser(req.body)
    .then(() => {
      res.end();
    })
    .catch((err) => res.status(500).json(err));
});

//Routes for adding new users to specific pages
app.post("/instNewUser", (req, res) => {
  console.log("Post =", req.body);
  return postAccounts.addInstUser(req.body).then(() => {
    res.end();
  });
});

app.post("/courseNewUser", (req, res) => {
  console.log("Post =", req.body);
  return postAccounts.addCourseUser(req.body).then(() => {
    res.end();
  });
});

app.post("/classNewUser", (req, res) => {
  console.log("Post =", req.body);
  return postAccounts.addClassUser(req.body).then(() => {
    res.end();
  });
});

//New Institution, Class, Course
const PostPages = require("./services/PostRoutes/PostPages");
const postPages = new PostPages(knex);

app.post("/newInst", async (req, res) => {
  console.log("New Institution:", req.body.name);
  return postPages.newInst(req.body).then(() => {
    res.end();
  });
});

app.post("/newCourse", async (req, res) => {
  console.log("New Course:", req.body.newName);
  return postPages.newCourse(req.body).then(() => {
    res.end();
  });
});

app.post("/newClass", async (req, res) => {
  console.log("New Class:", req.body.newName);
  return postPages.newClass(req.body).then(() => {
    // res.redirect('back');
    res.end();
  });
});

app.post("/modifyInst", async (req, res) => {
  console.log(`Modifying This Institution`);
  return postPages.modifyInst(req.body).then(() => {
    res.end();
  });
});

app.post("/modifyCourse", async (req, res) => {
  console.log(`Modifying This Course`);
  return postPages.modifyCourse(req.body).then(() => {
    res.end();
  });
});

app.post("/modifyClass", async (req, res) => {
  console.log(`Modifying This Class`);
  return postPages.modifyClass(req.body).then(() => {
    res.end();
  });
});

//New Note
const PostNotes = require("./services/PostRoutes/PostNotes");
const postNotes = new PostNotes(knex);

app.post("/newNote", async (req, res) => {
  console.log("New Note:", req.body);
  return postNotes.newNote(req.body).then(() => {
    res.end();
  });
});

app.post("/saveNote", async (req, res) => {
  console.log("Saving this note");
  return postNotes.saveNote(req.body).then(() => {
    res.end();
  });
});

//Question
const PostQuestions = require("./services/PostRoutes/PostQuestions");
const postQuestions = new PostQuestions(knex);

app.post("/newQuestion", async (req, res) => {
  console.log("New Question:", req.body);
  return postQuestions.newQuestion(req.body).then(() => {
    res.end();
  });
});

app.post("/modifyQuestion", async (req, res) => {
  console.log(`Modifying This Question`);
  return postQuestions.modifyQuestion(req.body).then(() => {
    res.end();
  });
});

app.post("/upvoteQuestion", async (req, res) => {
  console.log("upvoting question");
  return postQuestions.upvoteQuestion(req.body).then(() => {
    res.end();
  });
});

//Answer
const PostAnswers = require("./services/PostRoutes/PostAnswers");
const postAnswers = new PostAnswers(knex);

app.post("/newAnswer", async (req, res) => {
  console.log("New Answer:", req.body.details.title);
  return postAnswers.newAnswer(req.body).then(() => {
    res.end();
  });
});

app.post("/modifyAnswer", async (req, res) => {
  console.log(`Modifying This Answer`);
  return postAnswers.modifyAnswer(req.body).then(() => {
    res.end();
  });
});

app.post("answerQuestion", async (req, res) => {
  console.log("This answer is now correct:", req.body);
  return postAnswers.answerQuestion(req.body).then(() => {
    res.end();
  });
});

//Answer to answer
app.post("/newAtoa", async (req, res) => {
  console.log("New answer to answer:", req.body);
  return postAnswers.newAtoA(req.body).then(() => {
    res.end();
  });
});

app.post("modifyAtoa", async (req, res) => {
  console.log(`Modifying This Atoa`);
  return postAnswers.modifyAtoa(req.body).then(() => {
    res.end();
  });
});

app.post("/upvoteQuestion", async (req, res) => {
  console.log("upvoting answer");
  return postAnswers.upvoteAnswer(req.body).then(() => {
    res.end();
  });
});

app.post("/upvoteQuestion", async (req, res) => {
  console.log("upvoting answer to answer");
  return postAnswers.upvoteAtoa(req.body).then(() => {
    res.end();
  });
});

//Socket.io section for real-time notes section
io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("newUpdate", (state) => {
    console.log("New Update", state);
    socket.broadcast.emit("notesUpdated", JSON.stringify(state));
  });
});

const port = 8080;

server.listen(port, () => {
  console.log("App Listening on Port", port);
});
