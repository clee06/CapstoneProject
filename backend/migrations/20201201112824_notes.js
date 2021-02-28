
exports.up = function (knex) {
    return knex.schema.createTable('notes', (table) => {
        table.increments("id").primary().unsigned();
        table.string("title");
        table.string("type");
        table.text("text");
        table.string("privacy");
        table.boolean("pinned");
        table.timestamps(false, true);
        table.integer("usersID").unsigned().references("id").inTable("users");
        table.integer("classesID").unsigned().references("id").inTable("classes");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('notes');
};


