import { IsString } from "class-validator";

export class ChatDto {
  @IsString()
  message!: string;  // add ! To tell TS it will be assigned

  @IsString()
  role!: string;
}
