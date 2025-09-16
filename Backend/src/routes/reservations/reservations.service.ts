import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async createReservation(data: {
    userId: number;
    hotelId: number;
    roomType: string;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
  }) {
    // Optional: check for double-booking
    const overlapping = await this.prisma.reservation.findFirst({
      where: {
        hotelId: data.hotelId,
        roomType: data.roomType,
        checkIn: { lte: data.checkOut },
        checkOut: { gte: data.checkIn },
      },
    });

    if (overlapping) {
      throw new Error('Selected room is not available for these dates');
    }

    return this.prisma.reservation.create({ data });
  }

  async getReservationsByUser(userId: number) {
    return this.prisma.reservation.findMany({ where: { userId } });
  }
  }
