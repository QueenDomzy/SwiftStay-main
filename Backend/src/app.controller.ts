// src/app.controller.ts
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: "🚀 SwiftStay Backend is running!" };
  }

  @Get("/health")
  health() {
    return { status: "ok" };
  }
}
