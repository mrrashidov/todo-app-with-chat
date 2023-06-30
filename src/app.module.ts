import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/users/user.module';
import { TodoModule } from '@/modules/todos/todo.module';
import { TodoCategoriesModule } from '@/modules/todo_categories/todo_category.module';
import { ChatModule } from '@/modules/chats/chat.module';
import { WsModule } from '@/modules/ws/ws.module';
import { PasswordModule } from '@/modules/passwords/password.module';
import { AccountVerificationModule } from '@/modules/account-verification/account-verification.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    UserModule,
    TodoModule,
    TodoCategoriesModule,
    ChatModule,
    WsModule,
    PasswordModule,
    AccountVerificationModule,
  ],
})
export class AppModule {}
