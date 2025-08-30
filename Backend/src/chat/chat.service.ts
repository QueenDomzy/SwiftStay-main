import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatMessageDto } from './chat.dto';

@Injectable()
export class ChatService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(messages: ChatMessageDto[]): Promise<{ reply: string }> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      });

      const text =
        response.choices?.[0]?.message?.content?.trim() ||
        'Sorry, I could not generate a reply.';

      return { reply: text };
    } catch (error) {
      console.error('ChatService error:', error);
      return { reply: 'An error occurred while processing your request.' };
    }
  }
    }
