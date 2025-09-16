import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HotelsService {
  constructor(private prisma: PrismaService) {}

  async createHotel(data: {
    name: string;
    location: string;
    price: number;
    roomType: string;
    photos: string[];
    ownerId: number;
  }) {
    return this.prisma.hotel.create({
      data: {
        ...data,
        status: 'pending', // default
      },
    });
  }

  async getPendingHotels() {
    return this.prisma.hotel.findMany({ where: { status: 'pending' } });
  }
    }
