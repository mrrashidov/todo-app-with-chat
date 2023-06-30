import { PartialType } from '@nestjs/mapped-types';
import { ForgotPasswordDto } from './forgot-password.dto';
import { IsNotEmpty, IsString, Length, NotContains } from 'class-validator';
import { Match } from '@/shared/decorators/match.decorator';

export class ResetPasswordDto extends PartialType(ForgotPasswordDto) {
  @IsNotEmpty()
  @NotContains(' ')
  @Length(6, 100)
  token: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsNotEmpty()
  @Match('password')
  password_confirmation: string;
}
