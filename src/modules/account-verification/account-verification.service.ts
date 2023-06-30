import { Injectable } from '@nestjs/common';
import { AccountVerificationRepository } from '@/modules/account-verification/account-verification.repository';
import { UserRepository } from '@/modules/users/user.repository';

@Injectable()
export class AccountVerificationService {
  constructor(
    private readonly accountVerificationRepository: AccountVerificationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  send(token: string) {
    return token;
  }

  verify(token: string) {
    return token;
  }
}
