import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TodoCategoriesService } from './todo_categories.service';
import { CreateTodoCategoryDto } from './dto/create-todo_category.dto';
import { UpdateTodoCategoryDto } from './dto/update-todo_category.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TodoCategoriesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly todoCategoriesService: TodoCategoriesService) {}

  @SubscribeMessage('createTodoCategory')
  create(@MessageBody() createTodoCategoryDto: CreateTodoCategoryDto) {
    return this.todoCategoriesService.create(createTodoCategoryDto);
  }

  @SubscribeMessage('findAllTodoCategories')
  findAll() {
    return this.todoCategoriesService.findAll();
  }

  @SubscribeMessage('findOneTodoCategory')
  findOne(@MessageBody() id: number) {
    return this.todoCategoriesService.findOne(id);
  }

  @SubscribeMessage('updateTodoCategory')
  update(@MessageBody() updateTodoCategoryDto: UpdateTodoCategoryDto) {
    return this.todoCategoriesService.update(
      updateTodoCategoryDto.id,
      updateTodoCategoryDto,
    );
  }

  @SubscribeMessage('removeTodoCategory')
  remove(@MessageBody() id: number) {
    return this.todoCategoriesService.remove(id);
  }
}
