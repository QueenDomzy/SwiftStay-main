import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const usersCount = await this.prisma.user.count();
    const hotelsCount = await this.prisma.hotel.count();
    const bookingsCount = await this.prisma.booking.count();

    return { usersCount, hotelsCount, bookingsCount };
  }

  async createHotel(data: { name: string; location: string }) {
    return this.prisma.hotel.create({ data });
  }

  async deleteHotel(id: number) {
    return this.prisma.hotel.delete({ where: { id } });
  }
      }
