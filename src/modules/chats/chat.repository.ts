import { InjectKnex, Knex } from 'nestjs-knex';
import Chat from '@/modules/chats/entities/chat.entity';
import BaseRepositoryInterface, {
  Create,
  Update,
} from '~/global/base-repository.interface';
import { CursorInterface } from '~/global/pagination.interface';

export class ChatRepository implements BaseRepositoryInterface<Chat> {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private get chats() {
    return this.knex<Chat>('chats');
  }

  async create(dto: Create<Chat>): Promise<Chat> {
    const result = await this.chats.insert(dto).returning('*');

    return result[0];
  }

  findById(id: number): Promise<Chat> {
    return this.chats.where({ id }).first();
  }

  find(filter?: CursorInterface): Promise<Chat[]> {
    return this.chats.select('*');
  }

  first(where: Chat): Promise<Chat> {
    return this.chats.where(where).first();
  }

  async update(id: number, dto: Update<Chat>): Promise<Chat> {
    const result = await this.chats.where({ id }).update(dto).returning('*');

    return result[0];
  }

  delete(id: number): Promise<Chat> {
    return this.chats.where({ id }).del();
  }
}
