import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { TodoModule } from '@/modules/todos/todo.module';
import { TodoCategoriesModule } from '@/modules/todo_categories/todo_category.module';
import { ChatModule } from '@/modules/chats/chat.module';
import { WsModule } from '@/modules/ws/ws.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    UsersModule,
    TodoModule,
    TodoCategoriesModule,
    ChatModule,
    WsModule,
  ],
})
export class AppModule {}
