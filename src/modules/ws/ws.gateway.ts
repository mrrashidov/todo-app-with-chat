import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { Server, Socket } from 'socket.io';
import { CreateTodoCategoryDto } from '@/modules/todo_categories/dto/create-todo_category.dto';
import { CreateTodoDto } from '@/modules/todos/dto/create-todo.dto';
import { CreateChatDto } from '@/modules/chats/dto/create-chat.dto';
import { UsePipes, ValidationError, ValidationPipe } from '@nestjs/common';
import { MESSAGE, TODO, TODO_CATEGORY } from '@/modules/ws/ws.constants';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly service: WsService) {}

  handleDisconnect(client: Socket) {
    return this.service.handleDisconnect(client);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    return this.service.handleConnection(this.server, client, args);
  }

  @UsePipes(
    new ValidationPipe({
      exceptionFactory(validationErrors: ValidationError[] = []) {
        return new WsException(validationErrors);
      },
    }),
  )
  @SubscribeMessage(TODO_CATEGORY.NEW)
  newTodoCategory(@MessageBody() payload: CreateTodoCategoryDto) {
    return this.service.newTodoCategory(this.server, payload);
  }

  @SubscribeMessage(TODO.NEW)
  newTodo(@MessageBody() payload: CreateTodoDto) {
    return this.service.newTodo(this.server, payload);
  }

  @SubscribeMessage(MESSAGE.NEW)
  newMessage(@MessageBody() payload: CreateChatDto) {
    return this.service.newMessage(this.server, payload);
  }

  @SubscribeMessage(MESSAGE.TYPING)
  typing(@MessageBody('isTyping') isTyping: boolean) {
    return this.service.typing(this.server, isTyping);
  }
}
