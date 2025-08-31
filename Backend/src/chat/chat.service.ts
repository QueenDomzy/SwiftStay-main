import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatMessageDto } from './chat.dto';
import { ChatCompletionMessageParam} from "openai/resources/chat";

@Injectable()
export class ChatService {
  private openai: OpenAI;
   async getResponse(messages: string[]): Promise<string> {
  // Example mock response – replace with OpenAI or logic later
  return `You said: ${messages.join(", ")}`;
}
  
  constructor() {
    this.openai = new OpenAI({
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
    }
  {
  const response = await this.openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: dto.messages,
  });
  return response.choices[0].message.content;
} catch (error) {
  console.error("OpenAI API Error:", error);
  throw new Error("Failed to fetch response from OpenAI");
}
