class CourseService {
  constructor(knex) {
    this.knex = knex;
  }

  async getCourseDetails(courseID) {
    console.log("getting name for course:", courseID);

    let nameFinder = await this.knex
      .select("name")
      .from("courses")
      .where("id", courseID)
      .catch((err) => {
        throw new Error(err);
      });

    console.log("Name of course is", nameFinder[0].name);

    let courseName = nameFinder[0].name;

    console.log(`getting details for ${courseName}`);

    let baseDetails = await this.knex
      .select("*")
      .from("courses")
      .where("name", courseName)
      .catch((err) => {
        throw new Error(err);
      });

    console.log("Course Details Here", baseDetails[0]);

    let listOfTeachers = await this.getListOfTeachers(baseDetails[0].id);
    let listOfStudents = await this.getListOfStudents(baseDetails[0].id);
    let listOfClasses = await this.getListOfClasses(baseDetails[0].id);

    // let listOfQuestions = listofClasses.map(x => this.getListofQuestions(x))

    let listofAllUsers = await this.getListOfAllUsers();
    let listOfAllClasses = await this.getListOfAllClasses();

    let resultObject = {
      baseDetails: baseDetails[0],
      listOfTeachers: listOfTeachers,
      listOfStudents: listOfStudents,
      listOfClasses: listOfClasses,
      // listOfQuestions: listOfQuestions,
      listOfAllUsers: listofAllUsers,
      listOfAllClasses: listOfAllClasses,
    };

    return resultObject;
  }

  async getListOfStudents(coursesID) {
    console.log("Getting List of Students");

    let query = await this.knex
      .select("studentscourses.usersID", "users.username", "users.picture")
      .from("studentscourses")
      .innerJoin("users", "studentscourses.usersID", "users.id")
      .where("coursesID", coursesID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Students:", query);
    return query;
  }

  async getListOfTeachers(coursesID) {
    console.log("Getting List of Teachers");

    let query = await this.knex
      .select("teacherscourses.usersID", "users.username", "users.picture")
      .from("teacherscourses")
      .innerJoin("users", "teacherscourses.usersID", "users.id")
      .where("coursesID", coursesID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Teachers:", query);
    return query;
  }

  async getListOfClasses(coursesID) {
    console.log("Getting List of Classes");

    let query = await this.knex
      .select("*")
      .from("classes")
      .where("coursesID", coursesID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Classes:", query);
    return query;
  }

  async getListOfQuestions(x) {
    console.log("Getting List of Questions");

    let query = await this.knex
      .select("*")
      .from("questions")
      .where("classesID", x.id)
      .catch((err) => {
        throw new Error(err);
      });
    console.log(`Questions in ${x.name}:`, query);
    return query;
  }

  async getListOfAllUsers() {
    console.log("getting list of all users");

    let query = await this.knex
      .select("id", "username", "nickname", "picture")
      .from("users")
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of All users collected");

    return query;
  }

  async getListOfAllClasses() {
    console.log("getting list of all classes");

    let query = await this.knex
      .select("*")
      .from("classes")
      .catch((err) => {
        throw new Error(err);
      });

    console.log("List of All classes collected");

    return query;
  }
}

module.exports = CourseService;
