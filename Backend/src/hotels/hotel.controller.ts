import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Post()
  create(@Body() body: { name: string; location: string; price: number }) {
    return this.hotelService.createHotel(body);
  }

  @Get()
  list() {
    return this.hotelService.getAllHotels();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.hotelService.getHotelById(Number(id));
  }
}
