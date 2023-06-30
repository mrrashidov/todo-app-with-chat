import { Module } from '@nestjs/common';
import { TodoCategoriesService } from './todo_category.service';
import { TodoCategoriesController } from './todo_category.controller';
import { TodoCategoryRepository } from '@/modules/todo_categories/todo_category.repository';

@Module({
  providers: [TodoCategoriesService, TodoCategoryRepository],
  controllers: [TodoCategoriesController],
})
export class TodoCategoriesModule {}
