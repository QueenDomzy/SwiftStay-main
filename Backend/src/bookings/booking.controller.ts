// src/bookings/booking.controller.ts
import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';


@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get(':hotelId')
  async findByHotel(@Param('hotelId') hotelId: string) {
    return this.bookingService.findByHotel(Number(hotelId));
  }

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Delete(':id')
  cancelBooking(@Param('id') id: string, @Req() req: any) {
    return this.bookingService.cancelBooking(Number(id), req.user.role, req.user.sub);
  }
}
