import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post()
  async createReservation(@Body() body: any) {
    const { userId, hotelId, roomType, checkIn, checkOut, totalPrice } = body;
    try {
      const reservation = await this.reservationsService.createReservation({
        userId,
        hotelId,
        roomType,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        totalPrice: parseFloat(totalPrice),
      });
      return reservation;
    } catch (err) {
      return { error: err.message };
    }
  }

  @Get()
  async getReservations(@Query('userId') userId: string) {
    return this.reservationsService.getReservationsByUser(parseInt(userId));
  }
                          }
