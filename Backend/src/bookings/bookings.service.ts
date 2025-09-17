import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService, private aiService: AiService) {}

  async getHotelRecommendations(preferences: string) {
    return this.aiService.getHotelRecommendations(preferences);
  }
}
