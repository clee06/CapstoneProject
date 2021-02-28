
exports.up = function (knex) {
    return knex.schema.createTable('atoa', (table) => {
        table.increments("id").primary().unsigned();
        table.text("text");
        table.integer("votes");
        table.text("upvotedlist");
        table.timestamps(false, true);
        table.integer("usersID").unsigned().references("id").inTable("users");
        table.integer("answersID").unsigned().references("id").inTable("answers");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('atoa');
};

