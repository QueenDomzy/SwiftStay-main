// src/hotels/hotels.module.ts
import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  controllers: [HotelController],
  providers: [HotelService, PrismaService, JwtAuthGuard],
})
export class HotelModule {}
