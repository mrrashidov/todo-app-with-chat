import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PasswordRepository } from '@/modules/passwords/password.repository';
import { UserRepository } from '@/modules/users/user.repository';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'email',
    }),
  ],
  controllers: [PasswordController],
  providers: [
    PasswordService,
    PasswordRepository,
    UserRepository,
    ConfigService,
  ],
})
export class PasswordModule {}
