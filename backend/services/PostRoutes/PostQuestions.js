/*

newQuestion: 
{
    userID : auto set to 1
    classID : ID of class that is the parent of this question
    title : 
    text :
    privacy : true or false
    classpin : true or false
    institutionpin : true or false
    tags : array of tags
}

modifyQuestion : FOR NOW TAGS CAN'T BE MODIFIED
{
    title :
    text :
    privacy :
    classpin : 
    institutionpin :
}

upvoteQuestion :
{
    questionID : ID of the question being upvoted
    userID : ID of the user doing the upvoting, auto set to 1
}

pinQuestion :
{
    questionID : ID of the question being pinned/unpinned
}
*/



class PostQuestions {
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

    // async getClassID(input) {
    //     let classID = await this.knex
    //         .select("id")
    //         .from("classes")
    //         .where("name", input)
    //         .catch((err) => {
    //             throw new Error(err);
    //         })
    //     if (classID === undefined) {
    //         throw new Error("Class not found");
    //     } else {
    //         return classID[0];
    //     }

    // }

    // New Questions are posted with an object, parameters: username : username, classname : classname, details : all other details including title and actual text of question

    async newQuestion(input) {
        // let userID = await getUserID(input.username)
        // let classID = await getClassID(input.classname)

        input.userID = 1;

        console.log("New Question", input);

        let query = await this.knex
            .insert({
                title: input.title,
                text: input.text,
                votes: 0,
                privacy: input.privacy,
                classpin: input.classpin,
                institutionpin: input.institutionpin,
                answered: false,
                usersID: input.userID,
                classesID: input.classID
            })
            .into("questions")
            .returning("id")
            .catch((err) => {
                throw new Error(err);
            });

        let tags = input.tags;

        tags.map(async (tag) => {
            let query1 = await this.knex
                .select("*")
                .from("tags")
                .where("name", "=", tag.name)
                .then(async (data) => {
                    console.log(data, tag.name);
                    return data;
                })
                .catch((err) => {
                    throw new Error(err);
                });

            if (query1[0] === undefined) {
                await this.knex
                    .insert({
                        name: tag.name,
                    })
                    .into("tags")
                    .returning("id")
                    .then(async (data) => {
                        await this.knex
                            .insert({
                                questionsID: query[0],
                                tagsID: data[0],
                            })
                            .into("questionstags")
                            .returning("id")
                            .catch((err) => {
                                throw new Error(err);
                            });
                    });
            } else {
                await this.knex
                    .insert({
                        questionsID: query[0],
                        tagsID: query1[0].id,
                    })
                    .into("questionstags")
                    .returning("id")
                    .catch((err) => {
                        throw new Error(err);
                    });
            }

        })

        console.log("Question submitted")
    }


    async modifyQuestion(input) {
        console.log("Modifying this Question", input)

        let query = await this.knex
            .where('title', input.title)
            .update({
                title: input.title,
                text: input.text,
                privacy: input.privacy,
                classpin: input.classpin,
                institutionpin: input.institutionpin
            })
            .into("questions")
            .catch((err) => {
                throw new Error(err);
            })




        console.log("Modification Finished")
    }

    async upvoteQuestion(input) {

        input.userID = 1;
        input.username = "test";

        let query = await this.knex
            .where('id', input.questionID)
            .increment('votes', 1)
            .into("questions")
            .catch((err) => {
                throw new Error(err);
            })

        let query2 = await this.knex
            .select("upvotedlist")
            .from("questions")
            .where('id', input.questionID)
            .catch((err) => {
                throw new Error(err);
            })

        let updatedupvotedlist = [...query2[0], input.username];

        let query3 = await this.knex
            .where('id', input.questionID)
            .update({
                upvotedlist: updatedupvotedlist
            })
            .into("questions")
            .catch((err) => {
                throw new Error(err);
            })

        console.log("question upvoted")

    }

    async pinQuestion(input) {
        let finder = await this.knex
            .select("classpin")
            .from("questions")
            .where("id", questionID)
            .catch((err) => {
                throw new Error(err);
            })

        let query = await this.knex
            .where('id', input.questionID)
            .update({
                classpin: !finder[0].classpin
            })
            .into("questions")
            .catch((err) => {
                throw new Error(err);
            })
        console.log("question pinned")

    }

}

module.exports = PostQuestions;
