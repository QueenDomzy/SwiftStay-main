import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  // Create a new reservation
  async createReservation(data: CreateReservationDto) {
    // Optional: check for overlapping bookings
    const overlapping = await this.prisma.reservation.findFirst({
      where: {
        hotelId: data.hotelId,
        roomType: data.roomType,
        status: 'confirmed', // Only consider confirmed bookings
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

  // Get all reservations for a specific user
  async getReservationsByUser(userId: number) {
    return this.prisma.reservation.findMany({ where: { userId } });
  }

  // Get all reservations for a specific hotel
  async getReservationsByHotel(hotelId: number) {
    return this.prisma.reservation.findMany({
      where: { hotelId },
      orderBy: { checkIn: 'desc' },
    });
  }
}
