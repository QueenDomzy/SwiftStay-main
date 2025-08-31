// src/chat/chat.service.ts
import OpenAI from "openai";
import { ChatDto } from "./chat.dto";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class ChatService {
  async createChatCompletion(chatDto: ChatDto) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // or "gpt-4o"
        messages: chatDto.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      return completion.choices[0].message;
    } catch (error: any) {
      console.error("OpenAI Chat error:", error);
      throw new Error(error.message || "Chat service failed");
    }
  }
}
