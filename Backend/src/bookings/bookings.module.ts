// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Hotel } from '../hotels/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Hotel])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
