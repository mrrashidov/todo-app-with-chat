import { Test, TestingModule } from '@nestjs/testing';
import { TodoCategoriesController } from './todo_categories.controller';

describe('TodoCategoriesController', () => {
  let controller: TodoCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoCategoriesController],
    }).compile();

    controller = module.get<TodoCategoriesController>(TodoCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
