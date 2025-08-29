// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ChatModule } from './chat/chat.module';

@Module({
      imports: [
              ConfigModule.forRoot({ isGlobal: true }),
                  ThrottlerModule.forRoot([{ ttl: 60, limit: 60 }]), // basic rate limit
                      ChatModule,
      ],
})
export class AppModule {}
      ]
})