// src/hotels/hotels.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelsRepo: Repository<Hotel>,
  ) {}

  findAll(): Promise<Hotel[]> {
    return this.hotelsRepo.find({ relations: ['bookings'] });
  }

  findOne(id: string): Promise<Hotel | null> {
    return this.hotelsRepo.findOne({ where: { id }, relations: ['bookings'] });
  }

  create(hotel: Partial<Hotel>): Promise<Hotel> {
    const newHotel = this.hotelsRepo.create(hotel);
    return this.hotelsRepo.save(newHotel);
  }
  }
