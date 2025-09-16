// src/hotels/hotels.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHotelDto) {
    return this.prisma.hotel.create({ data: dto });
  }

  async findAll() {
    return this.prisma.hotel.findMany({ include: { bookings: true, rooms: true } });
  }

  async findOne(id: number) {
    return this.prisma.hotel.findUnique({ where: { id }, include: { bookings: true, rooms: true } });
  }
                                     }
