import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todo_categories', function (table) {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('description', 250).nullable();
    table.tinyint('color', 1).defaultTo(1);
    table.tinyint('status', 1).defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todo_categories');
}
