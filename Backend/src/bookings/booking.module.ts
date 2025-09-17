// src/booking/bookings.module.ts
import { Module } from '@nestjs/common';
import { BookingController } from './bookings.controller';
import { BookingService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  controllers: [BookingController],
  providers: [BookingService, PrismaService. JwtAuthGuard],
  imports: [],
})
export class BookingModule {}
