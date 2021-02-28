
exports.up = function (knex) {
    return knex.schema.createTable('studentsclasses', (table) => {
        table.increments("id").primary().unsigned();
        table.integer("usersID").unsigned().references("id").inTable("users");
        table.integer("classesID").unsigned().references("id").inTable("classes");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('studentsclasses');
};

