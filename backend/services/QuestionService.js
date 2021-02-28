class QuestionService {
  constructor(knex) {
    this.knex = knex;
  }

  async getQuestionDetails(questionID) {
    console.log(`getting question details for question number ${questionID}`);

    let baseDetails = await this.knex
      .select("*")
      .from("questions")
      .where("id", questionID)
      .catch((err) => {
        throw new Error(err);
      });

    console.log("Question details here", baseDetails[0]);

    let userDetails = await this.getUserDetails(baseDetails[0].usersID);
    let listOfAnswers = await this.getListOfAnswers(questionID);

    let answersPromises = listOfAnswers.map((x) => this.getListOfAtoa(x));

    let answersToAnswers = await Promise.all(answersPromises).catch((e) =>
      console.error(e)
    );

    let resultObject = {
      baseDetails: baseDetails[0],
      userDetails: userDetails,
      listOfAnswers: listOfAnswers,
      answersToAnswers: answersToAnswers,
    };

    return resultObject;
  }

  async getUserDetails(usersID) {
    console.log("getting user details");

    let query = await this.knex
      .select("username", "nickname", "picture", "type")
      .from("users")
      .where("id", usersID)
      .catch((err) => {
        throw new Error(err);
      });

    console.log("user details", query);
    return query;
  }

  async getListOfAnswers(questionsID) {
    console.log("getting list of answers");

    let query = await this.knex
      .select(
        "answers.id as answersID",
        "answers.text",
        "answers.votes",
        "answers.correct",
        "answers.created_at",
        "users.username",
        "users.nickname",
        "users.picture"
      )
      .from("answers")
      .innerJoin("users", "answers.usersID", "users.id")
      .where("questionsID", questionsID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("list of answers", query);
    return query;
  }

  async getListOfAtoa(x) {
    console.log("getting list of answers to answers");

    let query = await this.knex
      .select(
        "atoa.text",
        "atoa.votes",
        "atoa.correct",
        "atoa.created_at",
        "users.username",
        "users.nickname",
        "users.picture"
      )
      .from("atoa")
      .innerJoin("users", "atoa.usersID", "users.id")
      .where("answersID", x.answersID)
      .catch((err) => {
        throw new Error(err);
      });
    console.log("list of answers to answers", query);
    return query;
  }
}

module.exports = QuestionService;
