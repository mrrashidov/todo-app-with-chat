import { InjectKnex, Knex } from 'nestjs-knex';
import BaseRepositoryInterface, {
  Create,
  Update,
} from '~/global/base-repository.interface';
import { CursorInterface } from '~/global/pagination.interface';
import { Knex as KnexInterface } from 'knex';
import { User } from '@/modules/users/entities/user.entity';

export class UserRepository implements BaseRepositoryInterface<User> {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private get query(): KnexInterface.QueryBuilder {
    return this.knex<User>('users');
  }

  async create(dto: Create<User>): Promise<User> {
    const result = await this.query.insert(dto).returning('*');

    return result[0];
  }

  findById(id: number): Promise<User> {
    return this.query.where({ id }).first();
  }

  find(filter?: CursorInterface): Promise<User[]> {
    return this.query.select('*');
  }

  first(where: KnexInterface.Where<User, User>): Promise<User> {
    return this.query.where(where).first();
  }

  async update(id: number, dto: Update<User>): Promise<User> {
    const result = await this.query.where({ id }).update(dto).returning('*');

    return result[0];
  }

  delete(id: number): Promise<User> {
    return this.query.where({ id }).del();
  }
}
