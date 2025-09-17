import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationService, PrismaService],
  exports: [ReservationService],
})
export class ReservationsModule {}
