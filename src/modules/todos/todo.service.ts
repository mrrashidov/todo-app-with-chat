import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from '@/modules/todos/todo.repository';
import { Todo } from '@/modules/todos/entities/todo.entity';

@Injectable()
export class TodoService {
  private logger = new Logger(TodoService.name);

  constructor(private readonly repository: TodoRepository) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo | Error> {
    try {
      const hastItem = await this.repository.first((qb) =>
        qb.where({ title: createTodoDto.title }),
      );
      if (hastItem) {
        return Promise.reject(
          new UnprocessableEntityException('This todo already exists'),
        );
      }
      return this.repository.create(createTodoDto);
    } catch (e) {
      this.logger.error(e);
    }
  }

  findAll(query?: any): Promise<Todo[]> {
    try {
      return this.repository.find(query);
    } catch (e) {
      this.logger.error(e);
    }
  }

  findOne(id: number): Promise<Todo> {
    try {
      return this.repository.findById(id);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const hasItem = await this.findOne(id);
      if (!hasItem) {
        return Promise.reject(new NotFoundException('Todo not found'));
      }
      return this.repository.update(id, updateTodoDto);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async remove(id: number): Promise<Todo> {
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
