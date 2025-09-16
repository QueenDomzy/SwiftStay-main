// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';

const prisma = new PrismaClient();

@Injectable()
export class BookingsService {
  /**
   * Find bookings for a given hotel
   */
  async findByHotel(hotelId: number) {
    return prisma.booking.findMany({
      where: { hotelId },
      include: { hotel: true },
    });
  }

  /**
   * Create a booking for a hotel
   */
  async createBooking(dto: CreateBookingDto) {
    return prisma.booking.create({
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
