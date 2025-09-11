// src/chat/chat.service.ts
import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class ChatService {
  private openai = new OpenAI();

  async sendMessage(message: string, role: string = "user") {
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
