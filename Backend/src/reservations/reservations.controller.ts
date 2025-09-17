import { Controller, Post, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReservation(@Body() data: CreateReservationDto, @Request() req) {
    // Attach userId from JWT
    data.userId = req.user.userId;
    return this.reservationService.createReservation(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyReservations(@Request() req) {
    return this.reservationService.getReservationsByUser(req.user.userId);
  }
}
