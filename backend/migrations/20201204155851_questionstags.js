
exports.up = function (knex) {
    return knex.schema.createTable('questionstags', (table) => {
        table.increments("id").primary().unsigned();
        table.integer("questionsID").unsigned().references("id").inTable("questions");
        table.integer("tagsID").unsigned().references("id").inTable("tags");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('questionstags');
};

