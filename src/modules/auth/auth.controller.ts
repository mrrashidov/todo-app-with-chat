import { Throttle } from '@nestjs/throttler';
import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import type { Request, Response } from 'express';
import { IsPublic } from '@/shared/decorators/is-public.decorator';
import { User } from '@/shared/decorators/user.decorator';

@Throttle(20, 60)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  async signIn(@Body() payload: SignInAuthDto, @Res() res: Response) {
    return this.authService.signIn(res, payload);
  }

  @IsPublic()
  @Post('signup')
  signUp(@Body() payload: SignUpAuthDto) {
    return this.authService.signUp(payload);
  }

  @Post('logout')
  async logout(
    @Headers('authorization') token: string,
    @User() user: any,
  ): Promise<any> {
    return this.authService.logout(user, token);
  }

  @Post('refresh-token')
  refreshToken(@User() user: any, @Req() request: Request) {
    return this.authService.refreshToken(user, request.cookies.rt);
  }
}
