import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ChatMessageDto {
  role!: "user" | "assistant" | "system";
  content!: string;
}

export class ChatDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[] = [];
}
