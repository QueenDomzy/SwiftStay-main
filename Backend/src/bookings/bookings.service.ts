import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    // dto.userId and hotelId should be numbers in DTO - ensure that
    return this.prisma.booking.create({ data: dto as any });
  }

  async findOne(id: number) {
    return this.prisma.booking.findUnique({ where: { id } });
  }
}
