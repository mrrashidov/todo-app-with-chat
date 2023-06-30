import { Controller } from '@nestjs/common';
import { TodoCategoriesService } from '@/modules/todo_categories/todo_categories.service';
import { MessageBody } from '@nestjs/websockets';
import { CreateTodoCategoryDto } from '@/modules/todo_categories/dto/create-todo_category.dto';
import { UpdateTodoCategoryDto } from '@/modules/todo_categories/dto/update-todo_category.dto';

@Controller('todo-categories')
export class TodoCategoriesController {
  constructor(private readonly todoCategoriesService: TodoCategoriesService) {}

  create(@MessageBody() createTodoCategoryDto: CreateTodoCategoryDto) {
    return this.todoCategoriesService.create(createTodoCategoryDto);
  }

  findAll() {
    return this.todoCategoriesService.findAll();
  }

  findOne(@MessageBody() id: number) {
    return this.todoCategoriesService.findOne(id);
  }

  update(@MessageBody() updateTodoCategoryDto: UpdateTodoCategoryDto) {
    return this.todoCategoriesService.update(
      updateTodoCategoryDto.id,
      updateTodoCategoryDto,
    );
  }

  remove(@MessageBody() id: number) {
    return this.todoCategoriesService.remove(id);
  }
}
