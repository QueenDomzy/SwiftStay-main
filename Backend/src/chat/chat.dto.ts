// src/chat/chat.dto.ts
import { IsString, IsArray } from 'class-validator';

export class ChatRequestDto {
  @IsArray()
  @IsString({ each: true })
  messages: string[];
}

export class ChatMessageDto {
  role!: string;
  content!: string;
}

export class ChatDto {
  messages!: ChatMessageDto[];
             }
