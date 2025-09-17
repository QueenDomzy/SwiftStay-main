// src/reservations/reservations.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    return this.prisma.reservation.create({
      data: createReservationDto,
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany();
  }

  async findOne(id: number) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) throw new NotFoundException(`Reservation with ID ${id} not found`);
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.prisma.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: number) {
    return this.prisma.reservation.delete({ where: { id } });
  }
  }
