// src/reservations/reservations.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async createReservation(data: CreateReservationDto) {
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

  async getReservationsByUser(userId: number) {
    return this.prisma.reservation.findMany({ where: { userId } });
  }

  async getReservationsByHotel(hotelId: number) {
    return this.prisma.reservation.findMany({
      where: { hotelId },
      orderBy: { checkIn: 'desc' },
    });
  }

  async updateReservation(id: number, data: UpdateReservationDto) {
    return this.prisma.reservation.update({
      where: { id },
      data,
    });
  }

  async cancelReservation(id: number) {
    return this.prisma.reservation.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }
                          }
