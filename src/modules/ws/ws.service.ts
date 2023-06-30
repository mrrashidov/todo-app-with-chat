import { Injectable, Logger } from '@nestjs/common';
import { TodoCategoryRepository } from '@/modules/todo_categories/todo_category.repository';
import { TodoRepository } from '@/modules/todos/todo.repository';
import { ChatRepository } from '@/modules/chats/chat.repository';
import { CreateTodoCategoryDto } from '@/modules/todo_categories/dto/create-todo_category.dto';
import { CreateTodoDto } from '@/modules/todos/dto/create-todo.dto';
import { CreateChatDto } from '@/modules/chats/dto/create-chat.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';

@Injectable()
export class WsService {
  private readonly logger = new Logger(WsService.name);

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly todoCategoriesRepository: TodoCategoryRepository,
    private readonly todoRepository: TodoRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  handleDisconnect(client: Socket) {
    client.disconnect();
  }

  handleConnection(client: Socket, args: any) {
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

  newTodoCategory(payload: CreateTodoCategoryDto) {
    this.logger.log(payload);
  }

  newTodo(payload: CreateTodoDto) {
    this.logger.log(payload);
  }

  newMessage(payload: CreateChatDto) {
    this.logger.log(payload);
  }

  typing(typing: boolean) {
    this.logger.log(typing);
  }
}
