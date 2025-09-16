// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HotelsModule } from './hotels/hotels.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [HotelsModule, BookingsModule],
  controllers: [AppController],
})
export class AppModule {}
