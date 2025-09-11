import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import OpenAIApi from 'openai';

@Module({
  controllers: [ChatController],
  providers: [
    ChatService,
    {
      provide: OpenAIApi,
      useFactory: () => {
        const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,       
        });
        return new OpenAIApi; // ✅ now passing the required argument
      },
    },
  ],
})
export class ChatModule {}
