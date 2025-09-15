// src/bookings/bookings.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() {
    try {
      const bookings = await this.prisma.booking.findMany({
        include: { user: true, room: true },
      });
      return { bookings };
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch bookings'); // NestJS will turn this into 500
    }
  }
}
