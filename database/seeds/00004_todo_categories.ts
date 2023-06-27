import { Knex } from 'knex';

const todo_categories = [
  {
    name: 'First Category',
    description: 'lorem ipsum',
    color: 1,
  },
  {
    name: 'Second Category',
    description: 'lorem ipsum',
    color: 1,
  },
];

export async function seed(knex: Knex): Promise<void> {
  await Promise.all([
    knex('todo_categories').del(),
    knex('todo_categories').insert(todo_categories),
  ]);
}
