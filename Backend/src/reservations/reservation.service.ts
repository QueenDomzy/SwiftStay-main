import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async createReservation(data: CreateReservationDto) {
    return this.prisma.reservation.create({ data });
  }

  async getReservationsByUser(userId: number) {
    return this.prisma.reservation.findMany({ where: { userId } });
  }
}
