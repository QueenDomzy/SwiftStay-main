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

  async updateAvailability(hotelId: number, roomType: string, available: boolean) {
    // For MVP, you can just flag hotel/room as available/unavailable
    return this.prisma.hotel.update({
      where: { id: hotelId },
      data: { [`${roomType}Available`]: available }, // example: SingleAvailable, DoubleAvailable
    });
                    }
