import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTodoCategoryDto } from './dto/create-todo_category.dto';
import { UpdateTodoCategoryDto } from './dto/update-todo_category.dto';
import { TodoCategoryRepository } from '@/modules/todo_categories/todo_category.repository';
import { TodoCategory } from '@/modules/todo_categories/entities/todo_category.entity';

@Injectable()
export class TodoCategoriesService {
  private logger = new Logger(TodoCategoriesService.name);

  constructor(private readonly repository: TodoCategoryRepository) {}

  async create(
    createTodoCategoryDto: CreateTodoCategoryDto,
  ): Promise<TodoCategory | Error> {
    try {
      const hastItem = await this.repository.first((qb) =>
        qb.where({ name: createTodoCategoryDto.name }),
      );
      if (hastItem) {
        return Promise.reject(
          new UnprocessableEntityException('This todo category already exists'),
        );
      }
      return this.repository.create(createTodoCategoryDto);
    } catch (e) {
      this.logger.error(e);
    }
  }

  findAll(query?: any): Promise<TodoCategory[]> {
    try {
      return this.repository.find(query);
    } catch (e) {
      this.logger.error(e);
    }
  }

  findOne(id: number) {
    try {
      return this.repository.findById(id);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async update(id: number, updateTodoCategoryDto: UpdateTodoCategoryDto) {
    try {
      const hasItem = await this.findOne(id);
      if (!hasItem) {
        return Promise.reject(new NotFoundException('Todo not found'));
      }
      return this.repository.update(id, updateTodoCategoryDto);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async remove(id: number): Promise<TodoCategory> {
    try {
      const hasItem = await this.findOne(id);
      if (!hasItem) {
        return Promise.reject(new NotFoundException('Todo not found'));
      }
      return this.repository.delete(id);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
