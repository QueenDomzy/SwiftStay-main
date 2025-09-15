// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingsService],
  controllers: [BookingsController],
  exports: [BookingsService], // ✅ export if another module needs it
})
export class BookingsModule {}
