import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTodoCategoryDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsInt()
  color?: number;
  @IsOptional()
  @IsInt()
  status?: number;
}
