import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './chat.dto';
import { ChatCompletionMessageParam } from "openai/resources/chat";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async postChat(@Body() body: ChatRequestDto) {
    const { messages } = body || { messages: [] };
    const messages: ChatCompletionMessageParam[] = [
  { role: "user", content: "Hello" }
];
    const result = await this.chatService.chat(messages || []);
    return result; // { reply: string }
  }
}
