import { Module } from '@nestjs/common';
import { ReservationsService } from './reservation.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
