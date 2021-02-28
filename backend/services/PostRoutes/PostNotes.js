/*

newNote:

{
    userID : auto set to 1
    classID : ID of parent Class
    title : 
    type :
    text : starting text of note
    privacy : true or false
    pinned : true or false
}

saveNote:

{
    noteID : ID of note
    text : text of note to be saved
}



*/

class PostNotes {
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


    async newNote(input) {
        // let userID = await getUserID(input.username)
        // let classID = await getClassID(input.classname)
        console.log("New Note", input)

        let query = await this.knex
        .insert({
            title : input.title,
            type : input.type,
            text : input.text,
            privacy : input.privacy,
            pinned : input.pinned,
            usersID : input.userID,
            classID : input.classID
        })
        .into("notes")
        .returning("id")
        .catch((err) => {
            throw new Error(err);
        });

        console.log("Note submitted")
    }

    async saveNote(input) {
        console.log("Saving this Note", input)

        let query = await this.knex
            .where('id', input.noteID)
            .update({
                text : input.text,
                })
            .into("notes")
            .catch((err) => {
                throw new Error(err);
            })
            console.log("Saving Finished")

    }

}

module.exports = PostNotes;
