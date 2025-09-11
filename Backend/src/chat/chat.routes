import { Router, Request, Response } from "express";
import ChatController from "./chat.controller";

const router = Router();
const chatController = new ChatController();

// Simple POST route for chat messages
router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await chatController.handleMessage(message);
    res.json({ reply });
  } catch (error: any) {
    console.error("Chat route error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
