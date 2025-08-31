// chat.controller.ts
import { Request, Response } from "express";
import { ChatService } from "./chat.service";

export default class ChatController {
  private chatService = new ChatService();

  async handleMessage(req: Request, res: Response) {
    try {
      const { messages } = req.body;
      const response = await this.chatService.createChat(messages);
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
        }
