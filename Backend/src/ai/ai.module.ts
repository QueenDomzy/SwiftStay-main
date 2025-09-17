import { Module } from '@nestjs/common';
import { AiService } from './ai.service';

@Module({
  providers: [AiService],
  exports: [AiService],  // <-- Make sure the service is exported
})
export class AiModule {}
