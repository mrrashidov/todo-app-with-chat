import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from '@/modules/todos/todo.repository';

@Module({
  providers: [TodoService, TodoRepository],
  controllers: [TodoController],
})
export class TodoModule {}
