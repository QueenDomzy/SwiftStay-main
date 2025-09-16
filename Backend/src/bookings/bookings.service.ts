// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        guestName: dto.guestName,
        checkIn: new Date(dto.checkIn),
        checkOut: new Date(dto.checkOut),
        hotel: { connect: { id: dto.hotelId } },
        room: { connect: { id: dto.roomId } },
      },
      include: { hotel: true, room: true },
    });
  }

  async findByHotel(hotelId: number) {
    return this.prisma.booking.findMany({
      where: { hotelId },
      include: { room: true, hotel: true },
    });
  }

  async findAll() {
    return this.prisma.booking.findMany({ include: { room: true, hotel: true } });
  }

  async findOne(id: number) {
    return this.prisma.booking.findUnique({ where: { id }, include: { room: true, hotel: true } });
  }
              }
