import { Controller, Get, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('recommendations')
  async recommendations(@Query('preferences') preferences: string) {
    return this.aiService.getHotelRecommendations(preferences);
  }

  @Get('pricing')
  async pricing(@Query('hotelName') hotelName: string, @Query('occupancy') occupancy: string) {
    return this.aiService.getPricingSuggestion(hotelName, Number(occupancy));
  }
                                                              }
