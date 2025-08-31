import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ChatDto } from "./chat.dto";

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getResponse(messages: ChatDto["messages"]): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini", // or gpt-3.5-turbo if cheaper
        messages: messages,
      });

      return response.choices[0].message?.content ?? "No response";
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw new Error("Failed to fetch response from OpenAI");
    }
  }
}
