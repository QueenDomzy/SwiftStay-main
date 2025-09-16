// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Hotel } from '../hotels/hotel.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepo: Repository<Booking>,
    @InjectRepository(Hotel)
    private readonly hotelsRepo: Repository<Hotel>,
  ) {}

  async findByHotelId(hotelId: string): Promise<Booking[]> {
  return this.bookingRepository.find({
    where: { hotel: { id: Number(hotelId) } }, // convert string -> number
    relations: ['hotel'],
  });
}

async create(newBooking: Partial<Booking>): Promise<Booking> {
  const hotel = await this.hotelRepository.findOne({
    where: { id: Number(newBooking.hotelId) }, // convert string -> number
  });

  if (!hotel) throw new Error('Hotel not found');

  const booking = this.bookingRepository.create({
    ...newBooking,
    hotel,
  });

  return this.bookingRepository.save(booking);
}
}
