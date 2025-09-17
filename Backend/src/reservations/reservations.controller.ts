import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateReservationDto, @Req() req: any) {
    return this.reservationService.createReservation({ ...dto, userId: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Req() req: any) {
    return this.reservationService.getReservationsByUser(req.user.id);
  }
}
