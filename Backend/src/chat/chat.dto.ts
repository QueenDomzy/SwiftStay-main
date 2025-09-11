// src/chat/chat.dto.ts
import { IsString, IsNotEmpty, IsIn } from "class-validator";

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsIn(["user", "system", "assistant"])
  role!: "user" | "system" | "assistant";
}
