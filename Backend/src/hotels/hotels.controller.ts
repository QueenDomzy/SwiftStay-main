import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
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
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

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

  @Get()
  async getAllHotels() {
    return this.hotelsService.getAllHotels();
  }

  @Get('pending')
  async pendingHotels() {
    return this.hotelsService.getPendingHotels();
  }

  @Patch(':id/availability')
  async updateAvailability(
    @Param('id') hotelId: string,
    @Body() body: { roomType: string; available: boolean }
  ) {
    return this.hotelsService.updateAvailability(
      parseInt(hotelId),
      body.roomType,
      body.available
    );
  }
}
