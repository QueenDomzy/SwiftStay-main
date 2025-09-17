import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Admin routes
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    return { message: 'Protected: Admin dashboard' };
  }
}

// Hotel routes (protected)
@Controller('hotels')
@UseGuards(JwtAuthGuard)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  async createHotel(@Body() body: any) {
    const { name, location, price, roomType, photos, ownerId } = body;

    if (!name || !location || !price || !roomType) {
      return { error: 'Missing required fields' };
    }

    return this.hotelService.createHotel({
      name,
      location,
      price: parseFloat(price),
      roomType,
      photos: photos || [],
      ownerId: parseInt(ownerId),
    });
  }

  @Get()
  async getAllHotels() {
    return this.hotelService.getAllHotels();
  }

  @Get('pending')
  async pendingHotels() {
    return this.hotelService.getPendingHotels();
  }

  @Patch(':id/availability')
  async updateAvailability(
    @Param('id') hotelId: string,
    @Body() body: { roomType: string; available: boolean }
  ) {
    return this.hotelService.updateAvailability(
      parseInt(hotelId),
      body.roomType,
      body.available
    );
  }
}
