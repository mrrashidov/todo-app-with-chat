import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordRepository } from '@/modules/passwords/password.repository';
import { UserRepository } from '@/modules/users/user.repository';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as bcrypt from 'bcrypt';
import { setTimezone } from '@/shared/utils/setTimezone';

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);

  constructor(
    @InjectQueue('email') private readonly queue: Queue,
    private readonly passwordRepository: PasswordRepository,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async forgotPassword({ email, phone }: ForgotPasswordDto) {
    try {
      const { randomBytes } = await import('crypto');

      const hasAccount = await this.userRepository.first((qb) =>
        qb.where(email ? { email } : { phone }),
      );

      if (!hasAccount) {
        return Promise.reject(new NotFoundException('Account not found'));
      }

      const token = randomBytes(16).toString('hex');

      const expires_at = new Date(
        Date.now() +
          parseInt(
            this.configService.get('RESET_PASSWORD_CODE_LIFETIME') || '20',
          ) *
            60000,
      );

      const hasToken = await this.passwordRepository.first((qb) =>
        qb.where({
          status: 'pending',
          user_id: hasAccount.id,
        }),
      );

      if (hasToken) {
        if (hasToken.expires_at <= new Date()) {
          await this.passwordRepository.update(hasToken.id, {
            status: 'rejected',
          });
        }

        return { message: 'Email already send' };
      } else {
        await this.passwordRepository.create({
          user_id: hasAccount.id,
          password: hasAccount.password,
          token,
          expires_at,
        });
        return this.queue
          .add('forgot-password', {
            email,
            url: `${this.configService.get('FRONT_APP_URL')}?token=${token}`,
          })
          .then(() => ({ message: 'Email sent' }));
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const hasItem = await this.passwordRepository.first((qb) =>
        qb.where({
          token: resetPasswordDto.token,
          status: 'pending',
        }),
      );
      if (
        hasItem &&
        setTimezone(hasItem.expires_at) >= setTimezone(new Date())
      ) {
        const newPassword = await bcrypt.hash(resetPasswordDto.password, 10);

        const matchOldPassword = await this.passwordRepository.first((qb) =>
          qb.where({
            password: newPassword,
          }),
        );
        if (matchOldPassword) {
          return Promise.reject(
            new UnprocessableEntityException('Password already used'),
          );
        }
        const result = await Promise.all([
          this.userRepository.update(hasItem.user_id, {
            password: newPassword,
          }),
          this.passwordRepository.update(hasItem.id, { status: 'accepted' }),
        ]);
        if (result.length >= 1) {
          await this.queue.add('reset-password', { email: result[0].email });
        }
        return { message: 'Password successfully changed' };
      } else {
        await this.passwordRepository.update(hasItem.id, {
          status: 'rejected',
        });

        return Promise.reject(
          new UnprocessableEntityException('Bad token or Token expired'),
        );
      }
    } catch (e) {
      this.logger.error(e);
    }
  }
}
