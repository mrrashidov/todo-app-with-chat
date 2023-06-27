import { Test, TestingModule } from '@nestjs/testing';
import { TodosGateway } from './todos.gateway';
import { TodosService } from './todos.service';

describe('TodosGateway', () => {
  let gateway: TodosGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosGateway, TodosService],
    }).compile();

    gateway = module.get<TodosGateway>(TodosGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
