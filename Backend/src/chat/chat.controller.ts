import { Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { ChatDto } from "./chat.dto";
import { ChatService } from "./chat.service";

export default class ChatController {
  private chatService = new ChatService();

  async handleMessage(req: Request, res: Response) {
    try {
      const dto = Object.assign(new ChatDto(), req.body);
      await validateOrReject(dto);

      // Calls the wrapper that the service now exposes
      const reply = await this.chatService.createChat(dto.messages);
      res.json({ success: true, reply });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err?.message || String(err) });
    }
  }
}
