
exports.up = function (knex) {
    return knex.schema.createTable('questions', (table) => {
        table.increments("id").primary().unsigned();
        table.string("title");
        table.text("text");
        table.integer("votes");
        table.text("upvotedlist");
        table.string("privacy");
        table.boolean("classpin");
        table.boolean("institutionpin");
        table.boolean("answered");
        table.timestamps(false, true);
        table.integer("usersID").unsigned().references("id").inTable("users");
        table.integer("classesID").unsigned().references("id").inTable("classes");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('questions');
};


