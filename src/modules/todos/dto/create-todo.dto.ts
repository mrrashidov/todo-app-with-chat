import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum TodoStatus {
  DELETED,
  BACKLOG,
  TODO,
  TEST,
  DONE,
}

export class CreateTodoDto {
  @IsString()
  title: string;
  @IsInt()
  category_id: number;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  priority?: number;
  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus = TodoStatus.BACKLOG;
}
