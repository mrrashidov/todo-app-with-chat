import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todos', function (table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('users.id').notNullable();
    table
      .integer('category_id')
      .unsigned()
      .references('todo_categories.id')
      .defaultTo(1);
    table.string('title', 150).notNullable();
    table.string('description', 250).nullable();
    table.tinyint('priority', 1).defaultTo(0);
    table.tinyint('status', 1).defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todos');
}
