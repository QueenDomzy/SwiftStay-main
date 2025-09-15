// src/bookings/bookings.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getAllBookings(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  getBookingById(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingsService.findOne(id);
  }

  @Post()
  createBooking(@Body() newBooking: Partial<Booking>): Promise<Booking> {
    return this.bookingsService.create(newBooking);
  }
}
