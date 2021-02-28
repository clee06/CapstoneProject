class ClassService {
  constructor(knex) {
    this.knex = knex;
  }

  async getClassDetails(classID) {
    console.log("getting name for class:", classID);

    let nameFinder = await this.knex
      .select("name")
      .from("classes")
      .where("id", classID)
      .catch((err) => {
        throw new Error(err);
      });

    console.log("Name of class is", nameFinder[0]);

    let className = nameFinder[0].name;

    console.log(`getting class details for ${className}`);

    let baseDetails = await this.knex
      .select("*")
      .from("classes")
      .where("name", className)
      .catch((err) => {
        throw new Error(err);
      });

    console.log("Class Details Here", baseDetails[0]);

    let listOfTeachers = await this.getListOfTeachers(baseDetails[0].id);
    let listOfStudents = await this.getListOfStudents(baseDetails[0].id);
    let listOfNotes = await this.getListOfNotes(baseDetails[0].id);
    let listOfQuestions = await this.getListOfQuestions(baseDetails[0].id);

    let listofAllUsers = await this.getListOfAllUsers();

    let resultObject = {
      baseDetails: baseDetails[0],
      listOfTeachers: listOfTeachers,
      listOfStudents: listOfStudents,
      listOfNotes: listOfNotes,
      listOfQuestions: listOfQuestions,
      listOfAllUsers: listofAllUsers,
    };

    return resultObject;
  }

  async getListOfTeachers(classID) {
    console.log("Getting List of Teachers");

    let query = await this.knex
      .select("teachersclasses.usersID", "users.username", "users.picture")
      .from("teachersclasses")
      .innerJoin("users", "teachersclasses.usersID", "users.id")
      .where("classesID", classID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Teachers:", query);
    return query;
  }

  async getListOfStudents(classID) {
    console.log("Getting List of Students");

    let query = await this.knex
      .select("studentsclasses.usersID", "users.username", "users.picture")
      .from("studentsclasses")
      .innerJoin("users", "studentsclasses.usersID", "users.id")
      .where("classesID", classID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Students:", query);
    return query;
  }

  async getListOfNotes(classID) {
    console.log("Getting List of Notes");

    let query = await this.knex
      .select("*")
      .from("notes")
      .where("classesID", classID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Notes:", query);
    return query;
  }

  async getListOfQuestions(classID) {
    console.log("Getting List of Questions");

    let query = await this.knex
      .select("*")
      .from("questions")
      .where("classesID", classID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("List of Questions:", query);
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
}

module.exports = ClassService;
