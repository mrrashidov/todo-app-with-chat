import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTodoCategoryDto } from './dto/create-todo_category.dto';
import { UpdateTodoCategoryDto } from './dto/update-todo_category.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class TodoCategoriesService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createTodoCategoryDto: CreateTodoCategoryDto) {
    const hastItem = await this.baseQuery({
      title: createTodoCategoryDto.name,
    }).first();
    if (hastItem) {
      throw new UnprocessableEntityException(
        'This todo category already exists',
      );
    }
    return this.knex('todo_categories')
      .insert(createTodoCategoryDto)
      .returning('*');
  }

  findAll() {
    return this.knex('todo_categories').whereNot({
      status: 0,
    });
  }

  findOne(id: number) {
    return this.baseQuery({ id }).first();
  }

  async update(id: number, updateTodoCategoryDto: UpdateTodoCategoryDto) {
    const hasItem = this.baseQuery({ id }).clone().first();
    if (!hasItem) {
      throw new NotFoundException('Todo not found');
    }
    return this.baseQuery({ id }).update(updateTodoCategoryDto).returning('*');
  }

  remove(id: number) {
    const hasItem = this.baseQuery({ id }).clone().first();
    if (!hasItem) {
      throw new NotFoundException('Todo not found');
    }

    return this.baseQuery({ id }).update({ status: 0 }).returning('*');
  }

  private baseQuery(where: { [key: string]: any }) {
    return this.knex('todo_categories').where(where);
  }
}
