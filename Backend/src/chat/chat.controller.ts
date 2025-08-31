import { Router, Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { ChatDto } from "./chat.dto";
import { ChatService } from "./chat.service";

const router = Router();
const chatService = new ChatService();

router.post("/", async (req: Request, res: Response) => {
  try {
    // validate request body against DTO
    const chatDto = Object.assign(new ChatDto(), req.body);
    await validateOrReject(chatDto);

    // call OpenAI service
    const reply = await chatService.createChatCompletion(chatDto);

    res.json({ success: true, reply });
  } catch (err: any) {
    console.error("Chat route error:", err);
    res.status(400).json({ success: false, error: err.message || err });
  }
});

export default router;
