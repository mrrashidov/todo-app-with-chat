import { Knex } from 'knex';

const chats = [
  {
    sender_id: 1,
    receiver_id: 2,
    message: 'First message',
  },
  {
    sender_id: 2,
    receiver_id: 1,
    message: 'Second message',
  },
  {
    sender_id: 1,
    receiver_id: 2,
    message: 'Third message',
  },
];

export async function seed(knex: Knex): Promise<void> {
  await Promise.all([knex('chats').del(), knex('chats').insert(chats)]);
}
