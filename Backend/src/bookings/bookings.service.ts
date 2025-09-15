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

  async findAllByHotel(hotelId: string): Promise<Booking[]> {
    return this.bookingsRepo.find({
      where: { hotel: { id: hotelId } },
      relations: ['hotel'],
    });
  }

  async createForHotel(hotelId: string, data: Partial<Booking>): Promise<Booking> {
    const hotel = await this.hotelsRepo.findOne({ where: { id: hotelId } });
    if (!hotel) throw new Error('Hotel not found');

    const booking = this.bookingsRepo.create({ ...data, hotel });
    return this.bookingsRepo.save(booking);
  }
}
