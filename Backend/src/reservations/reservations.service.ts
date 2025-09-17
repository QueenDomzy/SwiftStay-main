// src/reservations/reservations.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  // Minimal method — guaranteed valid TS
  async createReservation(data: CreateReservationDto) {
    return this.prisma.reservation.create({ data });
  }
}
