// src/chat/chat.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class ChatRequestDto {
  @IsString()
  @IsNotEmpty()
  message!: string;  // use "!" to silence TS initializer error

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
