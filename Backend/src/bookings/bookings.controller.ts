// src/bookings/bookings.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get(':hotelId')
  async findByHotel(@Param('hotelId') hotelId: string) {
    return this.bookingsService.findByHotel(Number(hotelId));
  }

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }
  }
