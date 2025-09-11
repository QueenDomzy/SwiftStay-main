import { IsString } from "class-validator";

export class ChatMessageDto {
  @IsString()
  role!: string;

  @IsString()
  content!: string;
}
