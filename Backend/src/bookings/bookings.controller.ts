// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
