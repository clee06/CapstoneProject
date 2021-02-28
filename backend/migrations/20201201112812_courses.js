
exports.up = function (knex) {
    return knex.schema.createTable('courses', (table) => {
        table.increments("id").primary().unsigned();
        table.string("name");
        table.string("picture");
        table.text("overview");
        table.string("url")
        table.integer("institutionsID").unsigned().references("id").inTable("institutions");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('courses');
};
