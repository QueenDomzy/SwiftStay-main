// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return '🚀 SwiftStay Backend is running successfully!';
  }
}
