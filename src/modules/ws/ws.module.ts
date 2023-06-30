import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { JwtService } from '@nestjs/jwt';
import { TodoCategoryRepository } from '@/modules/todo_categories/todo_category.repository';
import { TodoRepository } from '@/modules/todos/todo.repository';
import { ChatRepository } from '@/modules/chats/chat.repository';

@Module({
  providers: [
    WsGateway,
    WsService,
    JwtService,
    TodoCategoryRepository,
    TodoRepository,
    ChatRepository,
  ],
})
export class WsModule {}
