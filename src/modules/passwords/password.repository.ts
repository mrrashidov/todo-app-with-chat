import { InjectKnex, Knex } from 'nestjs-knex';
import { Knex as KnexInterface } from 'knex';
import { ResetPassword } from './entities/password.entity';

export class PasswordRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private get query(): KnexInterface.QueryBuilder {
    return this.knex<ResetPassword>('reset_passwords');
  }

  async create(payload: any): Promise<ResetPassword> {
    const result = await this.query.insert(payload).returning('*');
    return result[0];
  }

  async update(id: number, payload: any): Promise<ResetPassword> {
    const result = await this.query
      .where({ id })
      .update(payload)
      .returning('*');

    return result[0];
  }

  first(
    where: KnexInterface.Where<ResetPassword, ResetPassword>,
  ): Promise<ResetPassword> {
    return this.query.where(where).first();
  }
}
