// src/bookings/bookings.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';

@Controller('hotels/:hotelId/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getAll(@Param('hotelId') hotelId: string): Promise<Booking[]> {
    return this.bookingsService.findAllByHotel(hotelId);
  }

  @Post()
  create(
    @Param('hotelId') hotelId: string,
    @Body() bookingData: Partial<Booking>,
  ): Promise<Booking> {
    return this.bookingsService.createForHotel(hotelId, bookingData);
  }
}
