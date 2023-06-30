import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectKnex, Knex } from 'nestjs-knex';

import { UserService } from '@/modules/users/user.service';
import { StatusType } from '~/global/enum.types';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserRepository } from '@/modules/users/user.repository';
import { Response } from 'express';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    @InjectQueue('email') private readonly queue: Queue,
    @InjectKnex() private readonly knex: Knex,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async signIn(res: Response, payload: SignInAuthDto) {
    const hasAccount = await this.userRepository.first((qb) =>
      qb.where({
        email: payload.email,
      }),
    );
    if (!hasAccount) throw new UnauthorizedException('Wrong email or password');
    const matchPassword = await bcrypt.compare(
      payload.password,
      hasAccount.password,
    );

    if (!matchPassword)
      throw new UnauthorizedException('Wrong email or password');
    if (hasAccount.status === StatusType.PENDING)
      throw new ForbiddenException(
        'Your account not active please active your account',
      );
    if (hasAccount.status === StatusType.BLOCK)
      throw new ForbiddenException('Your account blocked');
    if (hasAccount.status === StatusType.DELETED)
      throw new ForbiddenException('Your account deleted');
    const user = {
      id: hasAccount.id,
      full_name: `${hasAccount.first_name} ${hasAccount.last_name}`,
      avatar: hasAccount.avatar,
      role: {
        id: 'role-id-here',
        name: 'role-name-here',
        scopes: ['scopes-here'],
      },
    };
    const access_token = this.tokenGenerator({
      sub: hasAccount.id,
      issuer: 'front-app-url',
      role: {
        id: 'role-id',
        scopes: ['scopes-here'],
      },
    });

    if (payload.rememberMe) {
      const refresh_token = this.tokenGenerator(
        {
          sub: hasAccount.id,
          issuer: 'front-app-url',
        },
        true,
      );
      return res
        .cookie('rt', refresh_token, {
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200)
        .json({
          user,
          access_token,
        });
    } else {
      return res.status(200).json({
        user,
        access_token,
      });
    }
  }

  signUp(payload: SignUpAuthDto) {
    return this.userService.create(payload);
  }

  logout(user: string, token: string) {
    // TODO: NOT DONE
    return { user, token };
  }

  refreshToken(user: any, token: string) {
    if (!token || !user) {
      throw new UnauthorizedException();
    }
    const verifyToken = this.jwtService.verify(token, {
      secret:
        this.configService.get('JWT_SECRET') ||
        '279e6748cb67c36691c8bed072239880',
    });
    if (!verifyToken || user.id !== verifyToken.sub) {
      throw new UnauthorizedException();
    }
    const access_token = this.tokenGenerator({
      sub: user.id,
      issuer: 'front-app-url',
      role: {
        id: user.role.id,
        scopes: user.role.scopes,
      },
    });
    return { access_token };
  }

  protected tokenGenerator(payload: any, refreshable = false) {
    const options = refreshable
      ? {
          secret:
            this.configService.get('JWT_SECRET') ||
            '279e6748cb67c36691c8bed072239880',
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') || '1w',
        }
      : {
          secret:
            this.configService.get('JWT_SECRET') ||
            '279e6748cb67c36691c8bed072239880',
          expiresIn: this.configService.get('JWT_EXPIRES_IN') || '1h',
        };
    return this.jwtService.sign(payload, options);
  }
}
