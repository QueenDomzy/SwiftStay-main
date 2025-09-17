// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async getHotelRecommendations(userId: number) {
    // Dummy AI logic, replace with OpenAI API or your model
    return [
      { hotelName: 'SwiftStay Downtown', rating: 4.8 },
      { hotelName: 'SwiftStay Riverside', rating: 4.7 },
    ];
  }
}
