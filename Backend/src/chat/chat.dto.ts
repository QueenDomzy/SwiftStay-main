// src/chat/chat.dto.ts
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import OpenAI from "openai";

// ✅ fixed 'const' and 'content'
const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  { role: "user", content: "Hello" },
];

export class ChatMessageDto {
  role!: "user" | "assistant" | "system";
  content!: string;
}

export class ChatDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[] = []; // initialized properly
}
