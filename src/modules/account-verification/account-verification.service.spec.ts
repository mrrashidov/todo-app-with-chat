import { Test, TestingModule } from '@nestjs/testing';
import { AccountVerificationService } from './account-verification.service';

describe('AccountVerificationService', () => {
  let service: AccountVerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountVerificationService],
    }).compile();

    service = module.get<AccountVerificationService>(AccountVerificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
