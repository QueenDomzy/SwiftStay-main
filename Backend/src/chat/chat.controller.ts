import { Controller, Post, Body } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatDto } from "./chat.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("send")
  async sendMessage(@Body() chatDto: ChatDto) {
    // call the service with properly typed messages
    return this.chatService.getResponse(chatDto.messages);
  }
  }
