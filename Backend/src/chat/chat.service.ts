import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatMessageDto } from './chat.dto';
import { ChatCompletionMessageParam} from "openai/resources/chat";

@Injectable()
export class ChatService {
  async getResponse(messages: string[]): Promise<string> {
  // Example mock response – replace with OpenAI or logic later
  return `You said: ${messages.join(", ")}`;
}
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(messages: ChatMessageDto[]): Promise<{ reply: string }> {
    try {
      const messages: ChatCompletionMessageParam[] = [{ role: "user", 
       content: "Hello" }
   ];
         const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages.map(m => ({
          role: m.role as 'system' | 'user' | 'assistant',
          content: m.content,
        })),
      });

      const text =
        response.choices[0]?.message?.content?.trim() ||
        'Sorry, I could not generate a reply.';

      return { reply: text };
    } catch (error) {
      console.error('ChatService error:', error);
      return { reply: 'An error occurred while processing your request.' };
    }
  }
}
