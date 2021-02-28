// Need to redo the Lists of Classes and Questions, to properly map them to the Courses/Classes that are their parent - ie. need to add logic if the Course contains no Class, and the Class contains no questions

//Need a checker for services on all pages with editable content - to send back the type of user to the frontend so that we can check the editing priviliges of the specific user

class InstitutionService {
  constructor(knex) {
    this.knex = knex;
  }

  async getInstitutionDetails(institutionID) {
    console.log("getting name for institution:", institutionID);

    let institutionNameFinder = await this.knex
      .select("name")
      .from("institutions")
      .where("id", institutionID)
      .catch((err) => {
        throw new Error(err);
      });

    console.log("Name of Institution is", institutionNameFinder[0].name);

    let institutionName = institutionNameFinder[0].name;

    console.log(`getting details for ${institutionName}`);

    let baseDetails = await this.knex
      .select("*")
      .from("institutions")
      .where("name", institutionName)
      .catch((err) => {
        throw new Error(err);
      });

    console.log("Institution Details Here", baseDetails[0]);

    let listOfAdmins = await this.getListOfAdmins(baseDetails[0].id);
    let listOfTeachers = await this.getListOfTeachers(baseDetails[0].id);
    let listOfStudents = await this.getListOfStudents(baseDetails[0].id);
    let listOfCourses = await this.getListOfCourses(baseDetails[0].id);
    const classesPromises = listOfCourses.map((course) =>
      this.getListOfClasses(course)
    );
    const listOfClasses = await Promise.all(classesPromises).catch((e) =>
      console.error(e)
    );

    // let listOfQuestions = listOfClasses.map(
    //   async (x) => await this.getListOfQuestions(x)
    // );

    let listofAllUsers = await this.getListOfAllUsers();
    let listOfAllCourses = await this.getListOfAllCourses();

    let resultObject = {
      baseDetails: baseDetails[0],
      listOfAdmins: listOfAdmins,
      listOfTeachers: listOfTeachers,
      listOfStudents: listOfStudents,
      listOfCourses: listOfCourses,
      listOfClasses: listOfClasses,
      // listOfQuestions: listOfQuestions,
      listOfAllUsers: listofAllUsers,
      listOfAllCourses: listOfAllCourses,
    };

    return resultObject;
  }

  async getListOfAdmins(institutionID) {
    console.log("Getting List of Admins");

    let query = await this.knex
      .select("admins.usersID", "users.username", "users.picture")
      .from("admins")
      .innerJoin("users", "admins.usersID", "users.id")
      .where("institutionsID", institutionID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Admins:", query);
    return query;
  }

  async getListOfTeachers(institutionID) {
    console.log("Getting List of Teachers");

    let query = await this.knex
      .select("teachersinstitutions.usersID", "users.username", "users.picture")
      .from("teachersinstitutions")
      .innerJoin("users", "teachersinstitutions.usersID", "users.id")
      .where("institutionsID", institutionID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Teachers:", query);
    return query;
  }

  async getListOfStudents(institutionID) {
    console.log("Getting List of Students");

    let query = await this.knex
      .select("studentsinstitutions.usersID", "users.username", "users.picture")
      .from("studentsinstitutions")
      .innerJoin("users", "studentsinstitutions.usersID", "users.id")
      .where("institutionsID", institutionID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Students:", query);
    return query;
  }

  async getListOfCourses(institutionID) {
    console.log("Getting List of Courses");

    let query = await this.knex
      .select("*")
      .from("courses")
      .where("institutionsID", institutionID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Courses:", query);
    return query;
  }

  async getListOfClasses(course) {
    console.log("Getting List of Classes");

    let query = await this.knex
      .select("*")
      .from("classes")
      .where("coursesID", course.id)
      .catch((err) => {
        throw new Error(err);
      });
    console.log(`Classes in ${course.name}:`, query);
    return query;
  }

  async getListOfQuestions(y) {
    console.log("Getting List of Questions");

    let query = await this.knex
      .select("*")
      .from("questions")
      .where("classesID", y.id)
      .catch((err) => {
        throw new Error(err);
      });
    console.log(`Classes in ${y.name}:`, query);
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

  async getListOfAllCourses() {
    console.log("getting list of all courses");

    let query = await this.knex
      .select("*")
      .from("courses")
      .catch((err) => {
        throw new Error(err);
      });

    console.log("List of All courses collected");

    return query;
  }
}

module.exports = InstitutionService;
