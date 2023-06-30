import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from '@/shared/services/mail.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '@/modules/users/user.repository';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'email',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, MailService, UserRepository],
})
export class UserModule {}
