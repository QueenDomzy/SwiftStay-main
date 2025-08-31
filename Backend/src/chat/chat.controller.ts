import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
Import { ChatDto } from "./chat.dto";
import { ChatRequestDto } from './chat.dto';
import { ChatCompletionMessageParam } from "openai/resources/chat";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("send" )
  async sendMessaage(@Body() chatDto: ChatDto) { return this.chatService.getResponse(chatDto.messages);
  }
  async postChat(@Body() body: ChatRequestDto)
    const messages: ChatCompletionMessageParam[] = [
  { role: "user", content: "Hello" }
];
    const result = await this.chatService.chat(messages || []);
    return result; // { reply: string }
  }
}
