import { Module } from '@nestjs/common';
import { AccountVerificationService } from './account-verification.service';
import { AccountVerificationController } from './account-verification.controller';
import { UserRepository } from '@/modules/users/user.repository';
import { AccountVerificationRepository } from '@/modules/account-verification/account-verification.repository';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'email',
    }),
  ],
  controllers: [AccountVerificationController],
  providers: [
    AccountVerificationService,
    UserRepository,
    AccountVerificationRepository,
  ],
})
export class AccountVerificationModule {}
