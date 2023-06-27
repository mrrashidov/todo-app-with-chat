import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class ChatService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createChatDto: CreateChatDto) {
    return this.knex('chats').insert(createChatDto).returning('*');
  }

  findAll() {
    return this.knex('chats').whereNot({
      status: 0,
    });
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const hasItem = this.baseQuery({ id }).clone().first();
    if (!hasItem) {
      throw new NotFoundException('Message not found');
    }
    return this.baseQuery({ id }).update(updateChatDto).returning('*');
  }

  remove(id: number) {
    const hasItem = this.baseQuery({ id }).clone().first();
    if (!hasItem) {
      throw new NotFoundException('Message not found');
    }

    return this.baseQuery({ id }).update({ status: 0 }).returning('*');
  }

  identify(name: string, socketId: string) {
    console.log('identify', { name, socketId });
    return 'JoinRoom';
  }

  typing(isTyping: boolean, socketId: string) {
    console.log('typing', { isTyping, socketId });
    return 'Typing';
  }

  private baseQuery(where: { [key: string]: any }) {
    return this.knex('chats').where(where);
  }
}
