class SearchService {
  constructor(knex) {
    this.knex = knex;
  }

  async getSearchDetails(search) {
    console.log(`Getting Search Details`, search);

    if (search === undefined) {
      let searchQuery = await this.getSearchDefault();

      let searchResults = [
        {
          noSearch: false,
        },
      ];

      for (let i = 0; i < searchQuery.length; i++) {
        searchResults.push({
          type: "question",
          id: searchQuery[i].id,
          title: searchQuery[i].title,
          tags: searchQuery[i].tags,
          votes: searchQuery[i].votes,
          answered: searchQuery[i].answered,
          created: searchQuery[i].created_at,
          user: searchQuery[i].userName,
          class: searchQuery[i].className,
        });
      }

      return searchResults;
    }

    if (search.length > 0) {
      // the first result in the search is always an object with the key noSearch, which is automatically set to true if there is no search. So the frontend should always read search[0] to check to see if a search exists. If it's set to false, a message saying 'please search something' can be shown.
      let searchResults = [
        {
          noSearch: false,
        },
      ];

      // Code for searching in each table in the database
      if (search.SearchInUsers === true) {
        let searchQuery = await this.getSearchInUsers(input.query);

        //Gotta standardize the search results, so put them in a new object with these standard parameters which can be properly parsed in the frontend.
        for (let i = 0; i < searchQuery.length; i++) {
          searchResults.push({
            type: "user",
            id: searchQuery[i].id,
            username: searchQuery[i].username,
            nickname: searchQuery[i].nickname,
            picture: searchQuery[i].picture,
            userType: searchQuery[i].type,
          });
        }
      }

      if (search.SearchInCourses === true) {
        let searchQuery = await this.getSearchInCourses(input.query);

        for (let i = 0; i < searchQuery.length; i++) {
          searchResults.push({
            type: "course",
            id: searchQuery[i].id,
            name: searchQuery[i].name,
            picture: searchQuery[i].picture,
            created: searchQuery[i].created_at,
            institution: searchQuery[i].institutionName,
          });
        }
      }

      if (search.SearchInClasses === true) {
        let searchQuery = await this.getSearchInClasses(input.query);

        for (let i = 0; i < searchQuery.length; i++) {
          searchResults.push({
            type: "class",
            id: searchQuery[i].id,
            name: searchQuery[i].name,
            created: searchQuery[i].created_at,
            course: searchQuery[i].courseName,
          });
        }
      }

      if (search.SearchInNotes === true) {
        let searchQuery = await this.getSearchInNotes(input.query);

        for (let i = 0; i < searchQuery.length; i++) {
          searchResults.push({
            type: "note",
            id: searchQuery[i].id,
            name: searchQuery[i].name,
            type: searchQuery[i].type,
            created: searchQuery[i].created_at,
            user: searchQuery[i].userName,
            class: searchQuery[i].className,
          });
        }
      }

      if (search.SearchInQuestions === true) {
        let searchQuery = await this.getSearchInQuestions(input.query);

        for (let i = 0; i < searchQuery.length; i++) {
          searchResults.push({
            type: "question",
            id: searchQuery[i].id,
            title: searchQuery[i].title,
            tags: searchQuery[i].tags,
            votes: searchQuery[i].votes,
            answered: searchQuery[i].answered,
            created: searchQuery[i].created_at,
            user: searchQuery[i].userName,
            class: searchQuery[i].className,
          });
        }
      }

      if (search.SearchInAnswers === true) {
        let searchQuery = await this.getSearchInAnswers(input.query);

        for (let i = 0; i < searchQuery.length; i++) {
          searchResults.push({
            type: "answer",
            id: searchQuery[i].id,
            text: searchQuery[i].text,
            votes: searchQuery[i].votes,
            correct: searchQuery[i].correct,
            created: searchQuery[i].created_at,
            user: searchQuery[i].username,
            parentname: searchQuery[i].parentname,
          });
        }

        let searchQuery2 = await this.getSearchInAtoa(input.query);

        for (let i = 0; i < searchQuery2.length; i++) {
          searchResults.push({
            type: "answer",
            id: searchQuery2[i].id,
            text: searchQuery2[i].text,
            votes: searchQuery2[i].votes,
            correct: searchQuery2[i].correct,
            created: searchQuery2[i].created_at,
            user: searchQuery2[i].userName,
            parentName: searchQuery2[i].parentName,
          });
        }
      }

      if (searchResults.length <= 0) {
        searchResults = [
          {
            noSearch: true,
          },
        ];
      }

      console.log(searchResults);
      return searchResults;
    } else {
      let searchResults = [
        {
          noSearch: true,
        },
      ];
      return searchResults;
    }
  }

  async getSearchInUsers(searchQuery) {
    let query = await this.knex
      .select("id", "username", "nickname", "picture", "type")
      .from("users")
      .where("username", "ilike", `%${searchQuery}%`)
      .orWhere("nickname", "ilike", `%${searchQuery}%`);

    return query;
  }

  async getSearchInCourses(searchQuery) {
    let query = await this.knex
      .select(
        "courses.id as id",
        "courses.name as name",
        "courses.picture as picture",
        "courses.created_at as created_at",
        "institutions.name as institutionName"
      )
      .from("courses")
      .innerJoin("institutions", "courses.institutionsID", "institutions.id")
      .where("name", "ilike", `%${searchQuery}%`);

    return query;
  }

  async getSearchInClasses(searchQuery) {
    let query = await this.knex
      .select(
        "classes.id as id",
        "classes.name as name",
        "classes.created_at as created_at",
        "courses.name as courseName"
      )
      .from("classes")
      .innerJoin("courses", "classes.courseID", "courses.id")
      .where("name", "ilike", `%${searchQuery}%`);

    return query;
  }

  async getSearchInNotes(searchQuery) {
    let query = await this.knex
      .select(
        "notes.id as id",
        "notes.name as name",
        "notes.type as type",
        "notes.created_at as created_at",
        "users.username as userName",
        "classes.name as className"
      )
      .from("notes")
      .innerJoin("classes", "notes.classID", "classes.id")
      .innerJoin("users", "notes.userID", "users.id")
      .where("name", "ilike", `%${searchQuery}%`)
      .orWhere("type", "ilike", `%${searchQuery}%`);

    return query;
  }

  async getSearchInQuestions(searchQuery) {
    let query = await this.knex
      .select(
        "questions.id as id",
        "questions.title as title",
        "questions.votes as votes",
        "questions.answered as answered",
        "questions.created_at as created_at",
        "users.username as userName",
        "classes.name as className",
        "tags.name as tagName"
      )
      .from("questions")
      .join("users", "questions.userID", "users.id")
      .join("classes", "questions.classesID", "classes.id")
      .join("questionstags", "questions.id", "questionstags.questionsID")
      .join("tags", "questionstags.tagsID", "tags.id")
      .where("title", `%${searchQuery}%`)
      .orWhere("tagName", `%${searchQuery}%`);

    let resultArray = [];
    console.log(query);
    let prevLink;

    for (let i = 0; i < query.length; i++) {
      if (prevLink === undefined) {
        let tagQuery = await this.knex
          .select("tags.name")
          .from("tags")
          .join("questionstags", "tags.id", "questionstags.tagsID")
          .where("questionstags.questionsID", `${query[i].id}`);

        resultArray.push({
          ...query[i],
          tags: tagQuery,
        });
      } else if (prevLink.title === query[i].title) {
        console.log("question matches, skipping over");
      } else {
        let tagQuery = await this.knex
          .select("tags.name")
          .from("tags")
          .join("questionstags", "tags.id", "questionstags.tagsID")
          .where("questionstags.questionsID", `${query[i].id}`);

        resultArray.push({
          ...query[i],
          tags: tagQuery,
        });
      }
      prevLink = query[i];
    }

    console.log(resultArray);

    return resultArray;
  }

  async getSearchDefault(searchQuery) {
    let query = await this.knex
      .select(
        "questions.id as id",
        "questions.title as title",
        "questions.votes as votes",
        "questions.answered as answered",
        "questions.created_at as created_at",
        "users.username as userName",
        "classes.name as className",
        "tags.name as tagName"
      )
      .from("questions")
      .join("users", "questions.usersID", "users.id")
      .join("classes", "questions.classesID", "classes.id")
      .join("questionstags", "questions.id", "questionstags.questionsID")
      .join("tags", "questionstags.tagsID", "tags.id");

    let resultArray = [];
    console.log(query);
    let prevLink;

    for (let i = 0; i < query.length; i++) {
      if (prevLink === undefined) {
        let tagQuery = await this.knex
          .select("tags.name")
          .from("tags")
          .join("questionstags", "tags.id", "questionstags.tagsID")
          .where("questionstags.questionsID", `${query[i].id}`);

        resultArray.push({
          ...query[i],
          tags: tagQuery,
        });
      } else if (prevLink.title === query[i].title) {
        console.log("question matches, skipping over");
      } else {
        let tagQuery = await this.knex
          .select("tags.name")
          .from("tags")
          .join("questionstags", "tags.id", "questionstags.tagsID")
          .where("questionstags.questionsID", `${query[i].id}`);

        resultArray.push({
          ...query[i],
          tags: tagQuery,
        });
      }
      prevLink = query[i];
    }

    console.log(resultArray);

    return resultArray;
  }

  async getSearchInAnswers(searchQuery) {
    let query = await this.knex
      .select(
        "answers.id as id",
        "answers.text as text",
        "answers.votes as votes",
        "answers.correct as correct",
        "answers.created_at as created_at",
        "users.username as username",
        "questions.title as parentname"
      )
      .from("answers")
      .join("users", "answers.usersID", "users.id")
      .join("questions", "answers.questionsID", "questions.id")
      .where("text", "ilike", `%${searchQuery}%`);

    return query;
  }

  async getSearchInAtoa(searchQuery) {
    let query = await this.knex
      .select(
        "atoa.id as id",
        "atoa.text as text",
        "atoa.votes as votes",
        "atoa.correct as correct",
        "atoa.created_at as created_at",
        "users.username as username",
        "answers.id as answerlink",
        "questions.name as parentname"
      )
      .from("atoa")
      .join("users", "atoa.usersID", "users.id")
      .join("answers", "atoa.answersID", "answers.id")
      .join("questions", "answers.questionsID", "questions.id")
      .where("text", "ilike", `%${searchQuery}%`);

    return query;
  }
}

module.exports = SearchService;

/*

How Search Service should work:

1. The search query is typed into the search bar, which packages the query into an object - query being the key and the actual query as the value, the other key-value pairs are the various narrowing-down parameters, and should probably be booleans - for example, "SearchInClass - true; SearchInCourse - false; SearchInQuestions - true; SearchInNotes - false" - this object will be referred to as the Searched Object

1.5. Need to JSON.stringify() the search object becuase the search function only accepts strings, then JSON.parse() it in teh backend. Likely have to do that going the other direction as well.

2. The Searched Object is send through the redux system to the actions.js, where it's sent as a GET request to `${process.env.CLASSROOMX_APP_SERVER}/search?=search=${search}`}

3. The endpoint of /search looks into the req.query.search, thus recieving the Searched Object.

4. This goes into the SearchService, which uses a series of if statements to package together the Response Object using the Searched Object's boolean parameters to narrow things down

5. The Response Object is then repackaged, turned into a JSON object, and sent back to the frontend.

*/
