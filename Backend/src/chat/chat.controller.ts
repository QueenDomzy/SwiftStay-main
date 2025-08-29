// src/chat/chat.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './chat.dto';

@Controller('chat')
export class ChatController {
      constructor(private readonly chatService: ChatService) {}

        @Post()
          async postChat(@Body() body: ChatRequestDto) {
                  const { messages } = body || { messages: [] };
                      const result = await this.chatService.chat(messages || []);
                          return result; // { reply: string }
          }
}
          }
}
