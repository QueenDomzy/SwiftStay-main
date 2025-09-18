import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async createReservation(data: CreateReservationDto) {
    return this.prisma.$transaction(async (tx) => {
      // Check for overlapping confirmed bookings
      const overlapping = await tx.reservation.findFirst({
        where: {
          hotelId: data.hotelId,
          roomType: data.roomType,
          status: { in: ['confirmed', 'pending'] }, // block confirmed + pending
          checkIn: { lte: data.checkOut },
          checkOut: { gte: data.checkIn },
        },
      });

      if (overlapping) {
        throw new BadRequestException(
          'Selected room is not available for these dates',
        );
      }

      // Create reservation
      return tx.reservation.create({ data });
    });
  }

  async getReservationsByUser(userId: number) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: { hotel: true }, // include hotel info for user’s reservations
      orderBy: { checkIn: 'desc' },
    });
  }

  async getReservationsByHotel(hotelId: number) {
    return this.prisma.reservation.findMany({
      where: { hotelId },
      include: { user: true }, // include user info for hotel admins
      orderBy: { checkIn: 'desc' },
    });
  }
                                    }
