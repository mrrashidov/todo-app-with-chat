import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';

describe('ChatsController', () => {
  let controller: ChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
    }).compile();

    controller = module.get<ChatController>(ChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
