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

async createReservation(data: {
  userId: number;
  hotelId: number;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}) {
  // Check for overlapping bookings
  const overlapping = await this.prisma.reservation.findFirst({
    where: {
      hotelId: data.hotelId,
      roomType: data.roomType,
      status: 'confirmed',
      OR: [
        {
          checkIn: { lte: data.checkOut },
          checkOut: { gte: data.checkIn },
        },
      ],
    },
  });

  if (overlapping) {
    throw new Error('Selected room is not available for these dates');
  }

  // Create reservation
  return this.prisma.reservation.create({ data });
}

async getReservationsByHotel(hotelId: number) {
  return this.prisma.reservation.findMany({
    where: { hotelId },
    orderBy: { checkIn: 'desc' },
  });
}

    
