exports.up = function(knex) {
  return knex.schema.createTable('cobrancas', table => {
    table.increments('id').primary();

    table.integer('valor').notNullable();
    table.text('descricao').notNullable();
    table.date('vencimento').notNullable();
    table.text('status').notNullable();

    table
      .integer('cliente_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clientes')
      .onDelete('CASCADE');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cobrancas');
};