import { IsOptional, IsString } from 'class-validator';

export class QueryChatDto {
  @IsString()
  @IsOptional()
  created_at?: Date;
}
