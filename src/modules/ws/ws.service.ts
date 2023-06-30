import { Injectable, Logger } from '@nestjs/common';
import { CreateWDto } from './dto/create-w.dto';
import { UpdateWDto } from './dto/update-w.dto';
import { TodoCategoryRepository } from '@/modules/todo_categories/todo_category.repository';
import { TodoRepository } from '@/modules/todos/todo.repository';
import { ChatRepository } from '@/modules/chats/chat.repository';

@Injectable()
export class WsService {
  private logger = new Logger(WsService.name);

  constructor(
    private readonly todoCategoriesRepository: TodoCategoryRepository,
    private readonly todoRepository: TodoRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  create(createWDto: CreateWDto) {
    this.logger.log(createWDto);
  }

  findAll() {
    return `This action returns all ws`;
  }

  findOne(id: number) {
    return `This action returns a #${id} w`;
  }

  update(id: number, updateWDto: UpdateWDto) {
    this.logger.log(updateWDto);
    return `This action updates a #${id} w`;
  }

  remove(id: number) {
    return `This action removes a #${id} w`;
  }
}
