import ChatController from "./chat.controller";
import { Router } from "express";

const chatRoutes = Router();
const chatController = new ChatController();

chatRoutes.post("/", (req, res) => chatController.handleMessage(req, res));

export default chatRoutes;
