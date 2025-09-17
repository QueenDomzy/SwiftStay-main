// src/reservations/reservations.module.ts
import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService],
})
export class ReservationsModule {}
