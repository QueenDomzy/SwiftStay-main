// src/chat/chat.dto.ts
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import OpenAI from "openai";

cost messages: OpenAI.Chat.ChatCompletionMessageParam[] =  [
  { role: "user", coontent: "Hello" }
  ];

export class ChatMessageDto {
  role!: "user" | "assistant" | "system";
  content!: string;
}

export class ChatDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[] = [];  // ✅ Initialize to empty array
}
