// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepo: Repository<Booking>,
  ) {}

  findAll(): Promise<Booking[]> {
    return this.bookingsRepo.find();
  }

  findOne(id: string): Promise<Booking | null> {
    return this.bookingsRepo.findOne({ where: { id } });
  }

  create(booking: Partial<Booking>): Promise<Booking> {
    const newBooking = this.bookingsRepo.create(booking);
    return this.bookingsRepo.save(newBooking);
  }
    }
