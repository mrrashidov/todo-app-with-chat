import { Controller, Get, Param } from '@nestjs/common';
import { AccountVerificationService } from './account-verification.service';
import { IsPublic } from '@/shared/decorators/is-public.decorator';

@Controller('auth/verify')
export class AccountVerificationController {
  constructor(
    private readonly accountVerificationService: AccountVerificationService,
  ) {}

  @IsPublic()
  @Get('/:token')
  verify(@Param('token') token: string) {
    return this.accountVerificationService.verify(token);
  }

  @IsPublic()
  @Get('/send')
  send(@Param('token') token: string) {
    return this.accountVerificationService.send(token);
  }
}
