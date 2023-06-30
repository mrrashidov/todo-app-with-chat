import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatRepository } from '@/modules/chats/chat.repository';

@Injectable()
export class ChatService {
  private logger = new Logger(ChatService.name);

  constructor(private readonly repository: ChatRepository) {}

  async create(createChatDto: CreateChatDto) {
    try {
      return this.repository.create(createChatDto);
    } catch (e) {
      this.logger.error(e);
    }
  }

  findAll(query?: any) {
    try {
      return this.repository.find(query);
    } catch (e) {
      this.logger.error(e);
    }
  }

  findOne(id: number) {
    try {
      return this.repository.findById(id);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const hasItem = await this.findOne(id);
    if (!hasItem) {
      throw new NotFoundException('Message not found');
    }
    return this.repository.update(id, updateChatDto);
  }

  async remove(id: number) {
    const hasItem = await this.findOne(id);
    if (!hasItem) {
      throw new NotFoundException('Message not found');
    }
    return this.repository.delete(id);
  }

  identify(name: string, socketId: string) {
    console.log('identify', { name, socketId });
    return 'JoinRoom';
  }

  typing(isTyping: boolean, socketId: string) {
    console.log('typing', { isTyping, socketId });
    return 'Typing';
  }
}
