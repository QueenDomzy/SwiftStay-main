// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';

@Module({
  controllers: [BookingsController],
  providers: [],
})
export class BookingsModule {}
