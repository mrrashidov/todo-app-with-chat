import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TodosGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly todosService: TodosService) {}

  @SubscribeMessage('createTodo')
  create(@MessageBody() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @SubscribeMessage('findAllTodos')
  findAll() {
    return this.todosService.findAll();
  }

  @SubscribeMessage('findOneTodo')
  findOne(@MessageBody() id: number) {
    return this.todosService.findOne(id);
  }

  @SubscribeMessage('updateTodo')
  update(@MessageBody() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(updateTodoDto.id, updateTodoDto);
  }

  @SubscribeMessage('removeTodo')
  remove(@MessageBody() id: number) {
    return this.todosService.remove(id);
  }
}
