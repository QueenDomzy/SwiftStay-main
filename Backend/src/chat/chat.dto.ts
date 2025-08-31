import { IsArray, ValidateNested, IsString, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class ChatMessageDto {
  @IsIn(["user", "assistant", "system"])
  role!: "user" | "assistant" | "system";

  @IsString()
  content!: string;
}

export class ChatDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[] = [];
    }
