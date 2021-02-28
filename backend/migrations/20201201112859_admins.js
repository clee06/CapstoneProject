
exports.up = function (knex) {
    return knex.schema.createTable('admins', (table) => {
        table.increments("id").primary().unsigned();
        table.integer("usersID").unsigned().references("id").inTable("users");
        table.integer("institutionsID").unsigned().references("id").inTable("institutions");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('admins');
};

