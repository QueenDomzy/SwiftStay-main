import OpenAI from "openai";
import { ChatMessageDto } from "./chat.dto";

export class ChatService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async createChat(messages: ChatMessageDto[]) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    });
    return response;
  }
}
