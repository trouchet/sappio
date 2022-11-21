exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("login_string", 255).notNullable();
    table.string("password_hash", 255).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};

exports.config = { transaction: false };
