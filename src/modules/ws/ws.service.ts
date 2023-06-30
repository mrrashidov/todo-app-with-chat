import { Injectable, Logger } from '@nestjs/common';
import { TodoCategoryRepository } from '@/modules/todo_categories/todo_category.repository';
import { TodoRepository } from '@/modules/todos/todo.repository';
import { ChatRepository } from '@/modules/chats/chat.repository';
import { CreateTodoCategoryDto } from '@/modules/todo_categories/dto/create-todo_category.dto';
import { CreateTodoDto } from '@/modules/todos/dto/create-todo.dto';
import { CreateChatDto } from '@/modules/chats/dto/create-chat.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';

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

  async newTodoCategory(server: Server, payload: CreateTodoCategoryDto) {
    try {
      const newCategory = await this.todoCategoriesRepository.create(payload);
      server.emit('receiveTodoCategory', newCategory);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async newTodo(server: Server, payload: CreateTodoDto) {
    try {
      const newTodo = await this.todoRepository.create(payload);
      server.emit('receiveTodo', newTodo);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async newMessage(server: Server, payload: CreateChatDto) {
    try {
      const newMessage = await this.chatRepository.create(payload);
      server.emit('receiveMessage', newMessage);
    } catch (e) {
      this.logger.error(e);
    }
  }

  typing(server: Server, typing: boolean) {
    this.logger.log(typing);
    server.emit('receiveMessage', typing);
  }
}
