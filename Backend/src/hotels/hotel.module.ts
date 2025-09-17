// src/hotels/hotel.module.ts
import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HotelController],
  providers: [HotelService, PrismaService],
})
export class HotelModule {}
