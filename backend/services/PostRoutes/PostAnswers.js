/*

newAnswer: 
{
    userID : auto set to 1.
    text : 
    questionID : 
}

modifyAnswer:
{
    answerID : 
    text : 
}

newAtoa:
{
    userID : auto set to 1.
    text : 
    answerID : 

}

modifyAtoa:
{
    atoaID : 
    text : 

}

answerQuestion: 
{
    answerID : ID of answer being designated as the correct answer
}

upvoteAnswer:
{
    answerID : ID of answer being upvoted
    userID : auto set to user 1
}

upvoteAtoa:
{
    atoaID : ID of atoa being upvoted
    userID : auto set to user 1
}

*/


class PostAnswers {
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


    async newAnswer(input) {
        // let userID = await getUserID(input.username)
        console.log("new answer", input)

        input.userID = 1;

        let query = await this.knex
        .insert({
            text : input.text,
            votes : 0,
            correct : false,
            usersID : input.userID,
            questionsID : input.questionID
        })
        .into("answers")
        .returning("id")
        .catch((err) => {
            throw new Error(err);
        });
    }

    async modifyAnswer(input) {
        console.log("Modifying this answer", input)

        let query = await this.knex
        .where('id', input.answerID)
        .update({
            text : input.text
        })
        .into("answers")
        .catch((err) => {
            throw new Error(err);
        })

        console.log("modification finished")
    }

    async newAtoa(input) {
        // let userID = await getUserID(input.username)
        
        input.userID = 1;
        console.log("new answer to answer", input)
        
        let query = await this.knex
        .insert({
            text : input.text,
            votes : 0,
            usersID : input.userID,
            answersID : input.answerID
        })
        .into("atoa")
        .returning("id")
        .catch((err) => {
            throw new Error(err);
        });

    }

    async modifyAtoa(input) {
        console.log("Modifying this answer to answer", input)

        let query = await this.knex
        .where('id', input.atoaID)
        .update({
            text : input.text
        })
        .into("atoa")
        .catch((err) => {
            throw new Error(err);
        })

        console.log("modification finished")

    }

    // Input format: id of answer being designated as the correct answer

    async answerQuestion(input) {
        console.log(`Answer ${input.answerID} is being marked as correct`)

        let query = await this.knex
        .where('id', input.answerID)
        .update({
            correct : true
        })
        .into("answers")
        .catch((err) => {
            throw new Error(err);
        })

        let questionsIDfinder = await this.knex
        .select("questionsID")
        .where('id', input.answerID)
        .from("answers")
        .catch((err) => {
            throw new Error(err);
        })

        let query2 = await this.knex
        .where("id", questionsIDfinder[0])
        .update({
            answered : true
        })
        .into("questions")
        .catch((err) => {
            throw new Error(err);
        })

    }

    async upvoteAnswer(input) {

        input.userID = 1;
        input.username = "test";

        let query = await this.knex
        .where('id', input.answerID)
        .increment('votes', 1)
        .into("answers")
        .catch((err) => {
            throw new Error(err);
        })

        let query2 = await this.knex
            .select("upvotedlist")
            .from("answers")
            .where('id', input.answerID)
            .catch((err) => {
                throw new Error(err);
            })

        let updatedupvotedlist = [...query2[0], input.username];

        let query3 = await this.knex
            .where('id', input.answerID)
            .update({
                upvotedlist: updatedupvotedlist
            })
            .into("answers")
            .catch((err) => {
                throw new Error(err);
            })



        console.log("answer upvoted")

    }

    async upvoteAtoa(input) {

        input.userID = 1;
        input.username = "test";

        let query = await this.knex
        .where('id', input.atoaID)
        .increment('votes', 1)
        .into("atoa")
        .catch((err) => {
            throw new Error(err);
        })

        let query2 = await this.knex
            .select("upvotedlist")
            .from("atoa")
            .where('id', input.atoaID)
            .catch((err) => {
                throw new Error(err);
            })

        let updatedupvotedlist = [...query2[0], input.username];

        let query3 = await this.knex
            .where('id', input.atoaID)
            .update({
                upvotedlist: updatedupvotedlist
            })
            .into("atoa")
            .catch((err) => {
                throw new Error(err);
            })




        console.log("answer to answer upvoted")

    }

}

module.exports = PostAnswers;
