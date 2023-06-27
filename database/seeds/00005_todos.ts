import { Knex } from 'knex';

const todos = [
  {
    user_id: 1,
    category_id: 1,
    title: 'First todo',
    description: 'Lorem ipsum',
    priority: 1,
    status: 1,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'Second todo',
    description: 'Lorem ipsum',
    priority: 1,
    status: 2,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'Third todo',
    description: 'Lorem ipsum',
    priority: 1,
    status: 3,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'Fourth todo',
    description: 'Lorem ipsum',
    priority: 1,
    status: 4,
  },
];

export async function seed(knex: Knex): Promise<void> {
  await Promise.all([knex('todos').del(), knex('todos').insert(todos)]);
}
