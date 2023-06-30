import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { Server, Socket } from 'socket.io';
import { CreateTodoCategoryDto } from '@/modules/todo_categories/dto/create-todo_category.dto';
import { CreateTodoDto } from '@/modules/todos/dto/create-todo.dto';
import { CreateChatDto } from '@/modules/chats/dto/create-chat.dto';

@WebSocketGateway({
  namespace: 'ws',
  path: 'ws',
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly service: WsService) {}

  handleDisconnect(client: Socket) {
    this.service.handleDisconnect(client);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.service.handleConnection(client, args);
  }

  @SubscribeMessage('newTodoCategory')
  newTodoCategory(@MessageBody() payload: CreateTodoCategoryDto) {
    this.service.newTodoCategory(payload);
    this.server.emit('receiveTodoCategory', payload);
  }

  @SubscribeMessage('newTodo')
  newTodo(@MessageBody() payload: CreateTodoDto) {
    this.service.newTodo(payload);
    this.server.emit('receiveTodo', payload);
  }

  @SubscribeMessage('newMessage')
  newMessage(@MessageBody() payload: CreateChatDto) {
    this.service.newMessage(payload);
    this.server.emit('receiveMessage', payload);
  }

  @SubscribeMessage('typing')
  typing(@MessageBody('isTyping') isTyping: boolean) {
    this.service.typing(isTyping);
    this.server.emit('receiveMessage', isTyping);
  }
}
