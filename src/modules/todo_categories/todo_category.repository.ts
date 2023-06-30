import { InjectKnex, Knex } from 'nestjs-knex';
import { TodoCategory } from '@/modules/todo_categories/entities/todo_category.entity';
import BaseRepositoryInterface, {
  Create,
  Update,
} from '~/global/base-repository.interface';
import { CursorInterface } from '~/global/pagination.interface';
import { Knex as KnexInterface } from 'knex';

export class TodoCategoryRepository
  implements BaseRepositoryInterface<TodoCategory>
{
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private get query(): KnexInterface.QueryBuilder {
    return this.knex<TodoCategory>('todo_categories');
  }

  async create(dto: Create<TodoCategory>): Promise<TodoCategory> {
    const result = await this.query.insert(dto).returning('*');

    return result[0];
  }

  findById(id: number): Promise<TodoCategory> {
    return this.query.where({ id }).first();
  }

  find(filter?: CursorInterface): Promise<TodoCategory[]> {
    return this.query.select('*');
  }

  first(
    where: KnexInterface.Where<TodoCategory, TodoCategory>,
  ): Promise<TodoCategory> {
    return this.query.where(where).first();
  }

  async update(id: number, dto: Update<TodoCategory>): Promise<TodoCategory> {
    const result = await this.query.where({ id }).update(dto).returning('*');

    return result[0];
  }

  delete(id: number): Promise<TodoCategory> {
    return this.query.where({ id }).del();
  }
}
