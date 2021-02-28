/*

newInst: 
{
    userID : doesn't matter, will be set to 1 automatically
    name :
    picture :
    overview : 
}

newCourse: 
{
    userID : doesn't matter, will be set to 1 automatically
    institutionID : Should contain the ID of the institution which is its parent
    name :
    picture :
    overview : 

}

newClass: 
{
    userID : doesn't matter, will be set to 1 automatically
    courseID : Should contain the ID of the course which is its parent
    name :
    picture :
    startdate : 
    enddate :
}

modifyInst:

{
    picture :
    overview :
}

modifyCourse:

{
    picture :
    overview :
}

modifyClass:

{
    picture :
    startdate :
    enddate :
}

*/

class PostPages {
  constructor(knex) {
    this.knex = knex;
  }

  // async getUserID(input) {
  //     let userID = await this.knex
  //         .select("id")
  //         .from("users")
  //         .where("username", input)
  //         .catch((err) => {
  //             throw new Error(err);
  //         })
  //     if (userID === undefined) {
  //         throw new Error("User not found");
  //     } else {
  //         return userID[0];
  //     }
  // }

  // async gettingInstID(input) {
  //     console.log("getting institution ID")

  //     let result = await this.knex
  //     .select("id")
  //     .from("institutions")
  //     .where("name", input)
  //     .catch((err) => {
  //         throw new Error(err);
  //     })
  //     if (result === undefined) {
  //         throw new Error("Institution not found");
  //     } else {
  //         return result[0];
  //     }

  // }

  // async gettingCourseID(input) {
  //     console.log("getting course ID")

  //     let result = await this.knex
  //     .select("id")
  //     .from("courses")
  //     .where("name", input)
  //     .catch((err) => {
  //         throw new Error(err);
  //     })
  //     if (result === undefined) {
  //         throw new Error("course not found");
  //     } else {
  //         return result[0];
  //     }

  // }

  //Input should be an object with 2 keys, first being username and containing the username of the user, second being the name of the new institution, course or class, under the key newName

  //There should be a third key-value for course and class, called parentName, with the name of the parent institution or course.

  async newInst(input) {
    // let userID = await this.getUserID(input.username);

    input.userID = 1;

    console.log("new institution, name:", input.name);
    await this.knex
      .insert({
        name: input.name,
        picture: input.picture,
        overview: input.overview,
      })
      .into("institutions")
      .returning("id")
      .then(async (data) => {
        console.log("This should return the institution ID", data[0]);
        await this.knex
          .insert({
            usersID: input.userID,
            institutionsID: data[0],
          })
          .into("admins")
          .returning("id")
          .catch((err) => {
            throw new Error(err);
          });
      });
  }

  async newCourse(input) {
    // let userID = await this.getUserID(input.username);
    // let getInstID = await this.gettingInstID(input.parentName)

    input.userID = 1;

    console.log("new course, name:", input.name);
    await this.knex
      .insert({
        name: input.name,
        institutionsID: input.institutionID,
        picture: input.picture,
        overview: input.overview,
      })
      .into("courses")
      .returning("id")
      .then(async (data) => {
        console.log(data);
        await this.knex
          .insert({
            usersID: input.userID,
            coursesID: data[0],
          })
          .into("teacherscourses")
          .returning("id")
          .catch((err) => {
            throw new Error(err);
          });
      });
  }

  async newClass(input) {
    input.userID = 1;

    // let userID = await this.getUserID(input.username);
    // let getCourseID = await this.gettingCourseID(input.parentName)
    console.log("new class, name:", input.name);
    await this.knex
      .insert({
        name: input.name,
        coursesID: input.courseID,
        startdate: input.startdate,
        enddate: input.enddate,
      })
      .into("classes")
      .returning("id")
      .then(async (data) => {
        await this.knex
          .insert({
            usersID: input.userID,
            classesID: data[0],
          })
          .into("teachersclasses")
          .returning("id")
          .catch((err) => {
            throw new Error(err);
          });
      });
  }

  async modifyInst(input) {
    console.log("Modifying this Institution:", input.name);

    await this.knex
      .where("name", input.name)
      .update({
        picture: input.picture,
        overview: input.overview,
      })
      .into("institutions")
      .catch((err) => {
        throw new Error(err);
      });
    console.log("Modification Finished");
  }

  async modifyCourse(input) {
    console.log("Modifying this Course:", input.name);

    await this.knex
      .where("name", input.name)
      .update({
        picture: input.picture,
        overview: input.overview,
      })
      .into("courses")
      .catch((err) => {
        throw new Error(err);
      });
    console.log("Modification Finished");
  }

  async modifyClass(input) {
    console.log("Modifying this Class:", input.name);

    await this.knex
      .where("name", input.name)
      .update({
        picture: input.schedule,
        startdate: input.startdate,
        enddate: input.enddate,
      })
      .into("classes")
      .catch((err) => {
        throw new Error(err);
      });
    console.log("Modification Finished");
  }
}

module.exports = PostPages;

// async checkInst(input) {
//     let checker = await this.knex
//         .select("id", "name")
//         .from("institutions")
//         .where("name", input)
//         .catch((err) => {
//             throw new Error(err);
//         })

//     if (checker === undefined) {
//         return false;
//     } else {
//         return true;
//     }
// }

// async checkCourse(input) {
//     let checker = await this.knex
//         .select("id", "name")
//         .from("classes")
//         .where("name", input)
//         .catch((err) => {
//             throw new Error(err);
//         })

//     if (checker === undefined) {
//         return false;
//     } else {
//         return true;
//     }
// }

// async checkClass(input) {
//     let checker = await this.knex
//         .select("id", "name")
//         .from("classes")
//         .where("name", input)
//         .catch((err) => {
//             throw new Error(err);
//         })

//     if (checker === undefined) {
//         return false;
//     } else {
//         return true;
//     }
// }
