// src/bookings/bookings.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // or wherever your prisma client is

@Controller('api/bookings') // This makes the route /api/bookings
export class BookingsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() {
    return this.prisma.booking.findMany({
      include: { user: true, room: true },
    });
  }
}
