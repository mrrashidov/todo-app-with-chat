import { Test, TestingModule } from '@nestjs/testing';
import { TodoCategoriesService } from './todo_categories.service';

describe('TodoCategoriesService', () => {
  let service: TodoCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoCategoriesService],
    }).compile();

    service = module.get<TodoCategoriesService>(TodoCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
