import { Module } from '@nestjs/common';
import { TodoCategoriesService } from './todo_categories.service';
import { TodoCategoriesGateway } from './todo_categories.gateway';

@Module({
  providers: [TodoCategoriesGateway, TodoCategoriesService]
})
export class TodoCategoriesModule {}
