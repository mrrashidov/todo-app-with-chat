import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import * as bcrypt from 'bcrypt';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { TwoFactorRecoveryUserDto } from './dto/two-factor-recovery-user.dto';
import { TwoFactorUserDto } from './dto/two-factor-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailService } from '@/shared/services/mail.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Todo } from '@/modules/todos/entities/todo.entity';
import { UserRepository } from '@/modules/users/user.repository';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    @InjectKnex() private readonly knex: Knex,
    @InjectQueue('email') private readonly smsQueue: Queue,
    private readonly mailService: MailService,
    private readonly repository: UserRepository,
  ) {}

  twoFactor(payload: TwoFactorUserDto) {
    return payload;
  }

  twoFactorConfirm(code: string) {
    return code;
  }

  twoFactorRecovery(payload: TwoFactorRecoveryUserDto) {
    return payload;
  }

  changePassword(payload: ChangePasswordUserDto) {
    return payload;
  }

  async create(payload: CreateUserDto) {
    try {
      const baseQuery = await this.repository.first((qb) =>
        qb.where({ email: payload.email }),
      );
      if (baseQuery) {
        return Promise.reject(
          new ConflictException('This email already exists'),
        );
      }
      const genSalt = await bcrypt.genSalt();
      payload.password = await bcrypt.hash(payload.password, genSalt);

      const newUser = await this.repository.create(payload);
      await this.smsQueue.add('user-created', newUser);
      return newUser;
    } catch (e) {
      this.logger.error(e);
    }
  }

  findAll(query?: any): Promise<Todo[]> {
    try {
      return this.repository.find(query);
    } catch (e) {
      this.logger.error(e);
    }
  }

  findOne(id: number): Promise<User> {
    try {
      return this.repository.findById(id);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const hasItem = await this.findOne(id);
      if (!hasItem) {
        return Promise.reject(new NotFoundException('User not found'));
      }
      return this.repository.update(id, updateUserDto);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const hasItem = await this.findOne(id);
      if (!hasItem) {
        return Promise.reject(new NotFoundException('User not found'));
      }
      return this.repository.delete(id);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
