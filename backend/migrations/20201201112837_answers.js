
exports.up = function (knex) {
    return knex.schema.createTable('answers', (table) => {
        table.increments("id").primary().unsigned();
        table.text("text");
        table.integer("votes");
        table.text("upvotedlist");
        table.boolean("correct");
        table.timestamps(false, true);
        table.integer("usersID").unsigned().references("id").inTable("users");
        table.integer("questionsID").unsigned().references("id").inTable("questions");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('answers');
};

