U// src/hotels/hotels.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from './hotel.entity';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  getAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Hotel | null> {
    return this.hotelsService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Hotel>): Promise<Hotel> {
    return this.hotelsService.create(data);
  }
}
