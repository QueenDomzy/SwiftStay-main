// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BookingsController],
  providers: [PrismaService],
})
export class BookingsModule {}
