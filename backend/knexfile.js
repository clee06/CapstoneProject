// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "classroomx_database",
      user:     "user1",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "classroomx_database",
      user:     "user1",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "classroomx_database",
      user:     "user1",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
