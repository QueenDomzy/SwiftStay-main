import { Body, Controller, Get, Post } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Patch, Param, Body } from '@nestjs/common';

@Patch(':id/availability')
async updateAvailability(
  @Param('id') hotelId: string,
  @Body() body: { roomType: string; available: boolean }
) {
  // Optional: store availability per room type
  return this.hotelsService.updateAvailability(parseInt(hotelId), body.roomType, body.available);
}
@Controller('hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Post()
  async createHotel(@Body() body: any) {
    const { name, location, price, roomType, photos, ownerId } = body;

    if (!name || !location || !price || !roomType) {
      return { error: 'Missing required fields' };
    }

    return this.hotelsService.createHotel({
      name,
      location,
      price: parseFloat(price),
      roomType,
      photos: photos || [],
      ownerId: parseInt(ownerId),
    });
  }

  @Get('pending')
  async pendingHotels() {
    return this.hotelsService.getPendingHotels();
  }
}
