import { Router } from "express";
import { ChatService } from "./chat.service";
import { ChatDto } from "./chat.dto";

const router = Router();
const chatService = new ChatService();

router.post("/", async (req, res) => {
  const body: ChatDto = req.body;
  try {
    const response = await chatService.createChat(body.messages);
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
