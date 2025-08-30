// src/chat/chat.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class ChatDto {
  @IsString()
  message: string;

  @IsNumber()
  userId: number;
}
