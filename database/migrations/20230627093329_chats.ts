import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('chats', function (table) {
    table.increments('id').primary();
    table.integer('sender_id').unsigned().references('users.id').notNullable();
    table
      .integer('receiver_id')
      .unsigned()
      .references('users.id')
      .notNullable();
    table.string('message', 255).notNullable();
    table.tinyint('status', 1).defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('chats');
}
