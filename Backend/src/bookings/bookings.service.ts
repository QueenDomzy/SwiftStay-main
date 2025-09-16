import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find bookings for a given hotel
   */
  async findByHotel(hotelId: number) {
    return this.prisma.booking.findMany({
      where: { hotelId },
      include: { hotel: true },
    });
  }

  /**
   * Create a booking for a hotel
   */
  async createBooking(dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        guestName: dto.guestName,
        checkIn: new Date(dto.checkIn),
        checkOut: new Date(dto.checkOut),
        hotelId: dto.hotelId,
        roomId: dto.roomId,
      },
    });
  }
        }
