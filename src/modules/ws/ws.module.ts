import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { JwtService } from '@nestjs/jwt';
import { TodoService } from '@/modules/todos/todo.service';
import { TodoCategoriesService } from '@/modules/todo_categories/todo_category.service';
import { ChatService } from '@/modules/chats/chat.service';

@Module({
  providers: [
    WsGateway,
    WsService,
    JwtService,
    TodoCategoriesService,
    TodoService,
    ChatService,
  ],
})
export class WsModule {}
