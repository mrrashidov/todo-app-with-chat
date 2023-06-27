import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosGateway } from './todos.gateway';

@Module({
  providers: [TodosGateway, TodosService],
})
export class TodosModule {}
