import { InjectKnex, Knex } from 'nestjs-knex';
import BaseRepositoryInterface, {
  Create,
  Update,
} from '~/global/base-repository.interface';
import { CursorInterface } from '~/global/pagination.interface';
import { Knex as KnexInterface } from 'knex';
import { Todo } from '@/modules/todos/entities/todo.entity';

export class TodoRepository implements BaseRepositoryInterface<Todo> {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private get query(): KnexInterface.QueryBuilder {
    return this.knex<Todo>('todos');
  }

  async create(dto: Create<Todo>): Promise<Todo> {
    const result = await this.query.insert(dto).returning('*');

    return result[0];
  }

  findById(id: number): Promise<Todo> {
    return this.query.where({ id }).first();
  }

  find(filter?: CursorInterface): Promise<Todo[]> {
    return this.query.select('*');
  }

  first(where: KnexInterface.Where<Todo, Todo>): Promise<Todo> {
    return this.query.where(where).first();
  }

  async update(id: number, dto: Update<Todo>): Promise<Todo> {
    const result = await this.query.where({ id }).update(dto).returning('*');

    return result[0];
  }

  delete(id: number): Promise<Todo> {
    return this.query.where({ id }).del();
  }
}
