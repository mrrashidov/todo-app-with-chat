import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRepository } from '@/modules/chats/chat.repository';

@Module({
  providers: [ChatService, ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
