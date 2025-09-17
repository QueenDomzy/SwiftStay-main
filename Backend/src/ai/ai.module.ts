// src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { AiService } from './ai.service';

@Module({
  providers: [AiService],
  exports: [AiService], // important: allow other modules to use it
})
export class AiModule {}
