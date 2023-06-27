import { IsOptional, IsString } from 'class-validator';

export class CreateTodoCategoryDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  color?: number;
}
