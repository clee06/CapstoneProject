
exports.up = function (knex) {
    return knex.schema.createTable('studentscourses', (table) => {
        table.increments("id").primary().unsigned();
        table.integer("usersID").unsigned().references("id").inTable("users");
        table.integer("coursesID").unsigned().references("id").inTable("courses");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('studentscourses');
};

