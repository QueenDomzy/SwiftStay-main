// src/bookings/bookings.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  created: string;
}

@Controller('bookings')
export class BookingsController {
  private bookings: Booking[] = [
    {
      id: 'dummy1',
      userId: 'user123',
      roomId: '101',
      checkIn: '2025-09-15',
      checkOut: '2025-09-17',
      created: '2025-09-15',
    },
    {
      id: 'dummy2',
      userId: 'user456',
      roomId: '102',
      checkIn: '2025-09-18',
      checkOut: '2025-09-20',
      created: '2025-09-15',
    },
  ];

  // ✅ GET all bookings
  @Get()
  getAllBookings(): Booking[] {
    return this.bookings;
  }

  // ✅ GET a booking by ID
  @Get(':id')
  getBookingById(@Param('id') id: string): Booking | string {
    const booking = this.bookings.find((b) => b.id === id);
    return booking || `Booking with id ${id} not found`;
  }

  // ✅ POST a new booking
  @Post()
  createBooking(@Body() newBooking: Booking): Booking {
    const booking = {
      ...newBooking,
      created: new Date().toISOString().split('T')[0],
    };
    this.bookings.push(booking);
    return booking;
  }
    }
