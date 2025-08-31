import OpenAI from "openai";
import { ChatDto, ChatMessageDto } from "./chat.dto";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class ChatService {
  // Accept DTO
  async createChatCompletion(chatDto: ChatDto) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatDto.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return completion.choices[0]?.message ?? { role: "assistant", content: "" };
  }

  // ✅ Wrapper used by controller
  async createChat(messages: ChatMessageDto[]) {
    return this.createChatCompletion({ messages });
  }
}
