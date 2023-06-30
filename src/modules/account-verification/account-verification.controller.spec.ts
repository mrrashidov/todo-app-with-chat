import { Test, TestingModule } from '@nestjs/testing';
import { AccountVerificationController } from './account-verification.controller';
import { AccountVerificationService } from './account-verification.service';

describe('AccountVerificationController', () => {
  let controller: AccountVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountVerificationController],
      providers: [AccountVerificationService],
    }).compile();

    controller = module.get<AccountVerificationController>(AccountVerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
