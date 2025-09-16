// src/bookings/bookings.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('hotels/:hotelId/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Param('hotelId') hotelId: string, @Body() dto: CreateBookingDto) {
    // enforce hotelId from route
    dto.hotelId = Number(hotelId);
    return this.bookingsService.create(dto);
  }

  @Get()
  findByHotel(@Param('hotelId') hotelId: string) {
    return this.bookingsService.findByHotel(Number(hotelId));
  }
         }
