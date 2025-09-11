import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Configuration, OpenAIApi } from 'openai';

@Module({
  controllers: [ChatController],
  providers: [
    ChatService,
    {
      provide: OpenAIApi,
      useFactory: () => {
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });
        return new OpenAIApi(configuration); // ✅ now passing the required argument
      },
    },
  ],
})
export class ChatModule {}
