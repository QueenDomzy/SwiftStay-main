// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return { message: 'SwiftStay API (Prisma) is running 🚀' };
  }
}
