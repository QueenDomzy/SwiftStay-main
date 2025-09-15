import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from './hotel.entity';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  getAllHotels(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  getHotelById(@Param('id') id: string): Promise<Hotel | null> {
    return this.hotelsService.findOne(id);
  }

  @Post()
  createHotel(@Body() newHotel: Partial<Hotel>): Promise<Hotel> {
    return this.hotelsService.create(newHotel);
  }
}
