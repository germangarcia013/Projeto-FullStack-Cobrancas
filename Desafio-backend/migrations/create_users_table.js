exports.up = function(knex) {
  return knex.schema.createTable('usuarios', table => {
    table.increments('id').primary();

    table.text('nome').notNullable();
    table.text('email').notNullable().unique();
    table.text('senha').notNullable();
    table.text('cpf');
    table.text('telefone');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};