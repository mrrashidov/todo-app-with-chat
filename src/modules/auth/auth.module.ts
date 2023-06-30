import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtStrategy } from './strategy/jwt.strategy';
import { UserService } from '@/modules/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '@/shared/services/mail.service';
import { BullModule } from '@nestjs/bull';
import { UserRepository } from '@/modules/users/user.repository';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'email',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthJwtStrategy,
    JwtService,
    UserService,
    UserRepository,
    MailService,
  ],
})
export class AuthModule {}
