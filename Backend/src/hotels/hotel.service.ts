import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HotelService {
  constructor(private prisma: PrismaService) {}

  async createHotel(data: { name: string; location: string; price: number }) {
    return this.prisma.hotel.create({ data });
  }

  async getAllHotels() {
    return this.prisma.hotel.findMany();
  }

  async getHotelById(id: number) {
    return this.prisma.hotel.findUnique({ where: { id } });
  }
}
