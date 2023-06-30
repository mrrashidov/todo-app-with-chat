import { InjectKnex, Knex } from 'nestjs-knex';
import Chat from '@/modules/chats/entities/chat.entity';
import BaseRepositoryInterface, {
  Create,
  Update,
} from '~/global/base-repository.interface';
import { CursorInterface } from '~/global/pagination.interface';
import { Knex as KnexInterface } from 'knex';

export class ChatRepository implements BaseRepositoryInterface<Chat> {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private get query(): KnexInterface.QueryBuilder {
    return this.knex<Chat>('chats');
  }

  async create(dto: Create<Chat>): Promise<Chat> {
    const result = await this.query.insert(dto).returning('*');

    return result[0];
  }

  findById(id: number): Promise<Chat> {
    return this.query.where({ id }).first();
  }

  find(filter?: CursorInterface): Promise<Chat[]> {
    return this.query.select('*');
  }

  first(where: Chat): Promise<Chat> {
    return this.query.where(where).first();
  }

  async update(id: number, dto: Update<Chat>): Promise<Chat> {
    const result = await this.query.where({ id }).update(dto).returning('*');

    return result[0];
  }

  delete(id: number): Promise<Chat> {
    return this.query.where({ id }).del();
  }
}
