import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { CreateWDto } from './dto/create-w.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { CreateTodoCategoryDto } from '@/modules/todo_categories/dto/create-todo_category.dto';
import { CreateTodoDto } from '@/modules/todos/dto/create-todo.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

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
  private readonly logger = new Logger(WsGateway.name);

  constructor(
    private readonly wsService: WsService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
    client.disconnect();
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(args);
    this.jwt
      .verify(client.handshake.headers.authorization, {
        secret: this.config.get('JWT_SECRET'),
        ignoreExpiration: false,
      })
      .then((res) => (client['user'] = res.user))
      .catch((error) => {
        this.logger.error(error);
        client.disconnect();
        return error;
      })
      .finally(() => {
        this.logger.log(`Client Connected: ${client.id}`);
      });
  }

  @SubscribeMessage('newTodoCategory')
  newTodoCategory(@MessageBody() payload: CreateTodoCategoryDto) {
    this.server.emit('receiveTodoCategory', payload);
  }

  @SubscribeMessage('newTodo')
  newTodo(@MessageBody() payload: CreateTodoDto) {
    this.server.emit('receiveTodo', payload);
  }

  @SubscribeMessage('newMessage')
  newMessage(@MessageBody() createWDto: CreateWDto) {
    this.server.emit('receiveMessage', createWDto);
  }

  @SubscribeMessage('typing')
  typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log({ isTyping, id: client.id });
  }
}
