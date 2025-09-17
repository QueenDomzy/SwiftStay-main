import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateText(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message?.content ?? '';
  }

  async getHotelRecommendations(preferences: string): Promise<string[]> {
    const text = await this.generateText(`Recommend hotels based on: ${preferences}`);
    return text.split('\n').filter(Boolean);
  }
  }
