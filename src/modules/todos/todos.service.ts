import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTodoDto, TodoStatus } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class TodosService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createTodoDto: CreateTodoDto) {
    const hastItem = await this.baseQuery({
      title: createTodoDto.title,
    }).first();
    if (hastItem) {
      throw new UnprocessableEntityException('This todo already exists');
    }
    return this.knex('todos').insert(createTodoDto).returning('*');
  }

  findAll() {
    return this.knex('todos').whereNot({ status: TodoStatus.DELETED });
  }

  findOne(id: number) {
    return this.baseQuery({ id }).first();
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const hasItem = this.baseQuery({ id }).clone().first();
    if (!hasItem) {
      throw new NotFoundException('Todo not found');
    }
    return this.baseQuery({ id }).update(updateTodoDto).returning('*');
  }

  remove(id: number) {
    const hasItem = this.baseQuery({ id }).clone().first();
    if (!hasItem) {
      throw new NotFoundException('Todo not found');
    }

    return this.update(id, { id, status: TodoStatus.DELETED });
  }

  private baseQuery(where: { [key: string]: any }) {
    return this.knex('todos').where(where);
  }
}
