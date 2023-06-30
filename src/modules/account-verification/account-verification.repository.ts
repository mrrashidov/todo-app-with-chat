import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Knex as KnexInterface } from 'knex';

@Injectable()
export class AccountVerificationRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private get query(): KnexInterface.QueryBuilder {
    return this.knex('users');
  }
}
