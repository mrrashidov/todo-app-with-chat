import { Test, TestingModule } from '@nestjs/testing';
import { TodoCategoriesGateway } from './todo_categories.gateway';
import { TodoCategoriesService } from './todo_categories.service';

describe('TodoCategoriesGateway', () => {
  let gateway: TodoCategoriesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoCategoriesGateway, TodoCategoriesService],
    }).compile();

    gateway = module.get<TodoCategoriesGateway>(TodoCategoriesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
