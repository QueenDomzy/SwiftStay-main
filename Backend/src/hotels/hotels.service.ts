import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HotelService {
  constructor(private prisma: PrismaService) {}

  // Admin-only hotel creation
  async createHotelAdmin(data: {
    name: string;
    location: string;
    price: number;
    roomType: string;
    photos: string[];
    ownerId: number;
  }, userRole: string) {
    if (userRole !== 'ADMIN') throw new ForbiddenException('Access denied');
    return this.prisma.hotel.create({
      data: {
        ...data,
        status: 'pending',
      },
    });
  }

  async getAllHotels() {
    return this.prisma.hotel.findMany();
  }

  async getHotelById(id: number) {
    return this.prisma.hotel.findUnique({ where: { id } });
  }

  async updateHotel(id: number, data: any, userRole: string) {
    if (userRole !== 'ADMIN') throw new ForbiddenException('Access denied');
    return this.prisma.hotel.update({ where: { id }, data });
  }

  async deleteHotel(id: number, userRole: string) {
    if (userRole !== 'ADMIN') throw new ForbiddenException('Access denied');
    return this.prisma.hotel.delete({ where: { id } });
  }

  async getPendingHotels() {
    return this.prisma.hotel.findMany({ where: { status: 'pending' } });
  }

  async updateAvailability(hotelId: number, roomType: string, available: boolean) {
    return this.prisma.hotel.update({
      where: { id: hotelId },
      data: { [`${roomType}Available`]: available },
    });
  }
}
