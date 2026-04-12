exports.up = function(knex) {
  return knex.schema.createTable('clientes', table => {
    table.increments('id').primary();

    table.text('nome').notNullable();
    table.text('email').notNullable().unique();
    table.text('cpf').notNullable().unique();
    table.text('telefone').notNullable();
    table.text('cep');
    table.text('uf');
    table.text('complemento');
    table.text('bairro');
    table.text('cidade');
    table.text('status');

    table
      .integer('associado_id')
      .unsigned()
      .references('id')
      .inTable('usuarios')
      .onDelete('SET NULL');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('clientes');
};