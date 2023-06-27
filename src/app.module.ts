import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { TodosModule } from '@/modules/todos/todos.module';
import { TodoCategoriesModule } from '@/modules/todo_categories/todo_categories.module';
import { ChatModule } from '@/modules/chats/chat.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    UsersModule,
    TodosModule,
    TodoCategoriesModule,
    ChatModule,
  ],
})
export class AppModule {}
