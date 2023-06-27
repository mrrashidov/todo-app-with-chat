import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoCategoryDto } from './create-todo_category.dto';

export class UpdateTodoCategoryDto extends PartialType(CreateTodoCategoryDto) {
  id: number;
}
