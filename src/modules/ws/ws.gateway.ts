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
  @SubscribeMessage('newTodoCategory')
  newTodoCategory(@MessageBody() payload: CreateTodoCategoryDto) {
    return this.service.newTodoCategory(this.server, payload);
  }

  @SubscribeMessage('newTodo')
  newTodo(@MessageBody() payload: CreateTodoDto) {
    return this.service.newTodo(this.server, payload);
  }

  @SubscribeMessage('newMessage')
  newMessage(@MessageBody() payload: CreateChatDto) {
    return this.service.newMessage(this.server, payload);
  }

  @SubscribeMessage('typing')
  typing(@MessageBody('isTyping') isTyping: boolean) {
    return this.service.typing(this.server, isTyping);
  }
}
