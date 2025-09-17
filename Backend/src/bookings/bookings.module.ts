// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService. JwtAuthGuard],
  imports: [],
})
export class BookingsModule {}
