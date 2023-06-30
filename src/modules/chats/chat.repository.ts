import { InjectKnex, Knex } from 'nestjs-knex';
import ChatEntity from '@/modules/chats/entity/chat.entity';
import BaseRepositoryInterface, {
  Create,
  Update,
} from '~/global/base-repository.interface';
import { CursorInterface } from '~/global/pagination.interface';

export class ChatRepository implements BaseRepositoryInterface<ChatEntity> {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private get chats() {
    return this.knex<ChatEntity>('chats');
  }

  async create(dto: Create<ChatEntity>): Promise<ChatEntity> {
    const result = await this.chats.insert(dto).returning('*');

    return result[0];
  }

  findById(id: number): Promise<ChatEntity> {
    return this.chats.where({ id }).first();
  }

  find(filter?: CursorInterface): Promise<ChatEntity[]> {
    return this.chats.select('*');
  }

  first(where: ChatEntity): Promise<ChatEntity> {
    return this.chats.where(where).first();
  }

  async update(id: number, dto: Update<ChatEntity>): Promise<ChatEntity> {
    const result = await this.chats.where({ id }).update(dto).returning('*');

    return result[0];
  }

  delete(id: number): Promise<ChatEntity> {
    return this.chats.where({ id }).del();
  }
}
