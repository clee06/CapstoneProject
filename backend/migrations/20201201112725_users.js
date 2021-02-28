
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments("id").primary().unsigned();
        table.string("username").unique();
        table.string("password");
        table.string("nickname");
        table.string("picture");
        table.string("email").unique();
        table.text("bio");
        table.string("type");
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
