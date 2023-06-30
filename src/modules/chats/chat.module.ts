import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatsController } from './chats.controller';
import { ChatRepository } from '@/modules/chats/chat.repository';

@Module({
  providers: [ChatService, ChatRepository],
  controllers: [ChatsController],
})
export class ChatModule {}
