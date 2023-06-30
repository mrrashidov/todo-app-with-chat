import { Body, Controller, Post } from '@nestjs/common';
import { PasswordService } from './password.service';
import { IsPublic } from '@/shared/decorators/is-public.decorator';
import { ForgotPasswordDto } from '@/modules/passwords/dto/forgot-password.dto';
import { ResetPasswordDto } from '@/modules/passwords/dto/reset-password.dto';

@Controller('auth/password')
export class PasswordController {
  constructor(private readonly passwordsService: PasswordService) {}

  @IsPublic()
  @Post('/forgot')
  forgotPassword(@Body() payload: ForgotPasswordDto) {
    return this.passwordsService.forgotPassword(payload);
  }

  @IsPublic()
  @Post('/reset')
  resetPassword(@Body() payload: ResetPasswordDto) {
    return this.passwordsService.resetPassword(payload);
  }
}
