import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      { ttl: 60, limit: 60 }, // basic rate limit
    ]),
    ChatModule,
  ],
})
export class AppModule {}
