import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsOptional()
  @IsInt()
  sender_id: number;

  @IsInt()
  receiver_id: number;

  @IsString()
  message: string;

  @IsOptional()
  @IsInt()
  status = 1;
}
