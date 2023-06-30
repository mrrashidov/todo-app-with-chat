import { Injectable, Logger } from '@nestjs/common';
import { CreateWDto } from './dto/create-w.dto';
import { UpdateWDto } from './dto/update-w.dto';
import { TodoService } from '@/modules/todos/todo.service';
import { TodoCategoriesService } from '@/modules/todo_categories/todo_category.service';
import { ChatService } from '@/modules/chats/chat.service';

@Injectable()
export class WsService {
  private logger = new Logger(WsService.name);

  constructor(
    private readonly todoCategoriesService: TodoCategoriesService,
    private readonly todoService: TodoService,
    private readonly chatService: ChatService,
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
