import { Controller } from '@nestjs/common';
import { TodoService } from '@/modules/todos/todo.service';
import { MessageBody } from '@nestjs/websockets';
import { CreateTodoDto } from '@/modules/todos/dto/create-todo.dto';
import { UpdateTodoDto } from '@/modules/todos/dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  create(@MessageBody() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  findAll() {
    return this.todosService.findAll();
  }

  findOne(@MessageBody() id: number) {
    return this.todosService.findOne(id);
  }

  update(@MessageBody() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(updateTodoDto.id, updateTodoDto);
  }

  remove(@MessageBody() id: number) {
    return this.todosService.remove(id);
  }
}
