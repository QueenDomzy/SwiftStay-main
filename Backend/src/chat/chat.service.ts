// src/chat/chat.service.ts
import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class ChatService {
  private openai: OpenAI | null = null;
  private hasKey: boolean;

  constructor() {
    this.hasKey = !!process.env.OPENAI_API_KEY;

    if (this.hasKey) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } else {
      console.warn("⚠️ OPENAI_API_KEY is not set. ChatService will return mock responses.");
    }
  }

  async sendMessage(message: string, role: "user" | "system" | "assistant" = "user") {
    if (!this.hasKey || !this.openai) {
      // Mock response fallback
      return {
        role: "assistant",
        content: `🤖 Mock reply: You said "${message}". (No API key configured)`,
      };
    }

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role, content: message },
      ],
    });

    return response.choices[0].message;
  }
}
