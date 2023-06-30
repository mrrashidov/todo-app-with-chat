import { CursorInterface } from '~/global/pagination.interface';
import { Knex } from 'knex';

export type Create<T> = Partial<Omit<T, 'id' | 'created_at'>>;
export type Update<T> = Partial<Omit<T, 'id'>>;

export default interface BaseRepositoryInterface<T> {
  create(dto: Create<T>): Promise<T>;

  findById(id: number): Promise<T>;

  first(where: Knex.Where<T, T>): Promise<T>;

  find(query?: CursorInterface): Promise<T[]>;

  update(id: number, dto: Update<T>): Promise<T>;

  delete(id: number): Promise<T>;
}
