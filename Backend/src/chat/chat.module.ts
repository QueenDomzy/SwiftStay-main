import { Router, Request, Response } from "express";
import ChatController from "./chat.controller";

// Express router used by index.ts
const chatRoutes = Router();
const controller = new ChatController();

chatRoutes.post("/", (req: Request, res: Response) =>
  controller.handleMessage(req, res)
);

// ✅ Export a no-op class so `app.module.ts` can import { ChatModule } without build errors
export class ChatModule {}

// Default export remains the Express router (used by index.ts)
export default chatRoutes;
