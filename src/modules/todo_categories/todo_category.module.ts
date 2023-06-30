import { Module } from '@nestjs/common';
import { TodoCategoriesService } from './todo_categories.service';
import { TodoCategoriesController } from './todo_categories.controller';

@Module({
  providers: [TodoCategoriesService],
  controllers: [TodoCategoriesController],
})
export class TodoCategoriesModule {}
