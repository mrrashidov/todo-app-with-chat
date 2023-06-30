import { Controller } from '@nestjs/common';
import { ChatService } from '@/modules/chats/chat.service';
import { MessageBody } from '@nestjs/websockets';
import { CreateChatDto } from '@/modules/chats/dto/create-chat.dto';
import { UpdateChatDto } from '@/modules/chats/dto/update-chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  findAll() {
    return this.chatService.findAll();
  }

  findOne(id: number) {
    return this.chatService.findOne(id);
  }

  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
