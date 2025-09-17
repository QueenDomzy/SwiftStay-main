// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  // Get hotel recommendations based on user preferences
  async getHotelRecommendations(
    preferences:
      | string
      | {
          location: string;
          budget?: number;
          amenities?: string[];
        },
  ) {
    if (typeof preferences === 'string') {
      // In future: pass this string prompt to OpenAI or another AI model
      const hotels = [
        { name: 'SwiftStay Downtown', score: 4.7 },
        { name: 'SwiftStay Riverside', score: 4.5 },
      ];
      return hotels;
    }

    // If object preferences provided
    const { location, budget, amenities } = preferences;

    // Mocked hotel list
    const hotels = [
      { name: 'SwiftStay Premium', location, price: 10000, amenities: ['wifi', 'pool'] },
      { name: 'SwiftStay Comfort', location, price: 8000, amenities: ['wifi'] },
      { name: 'SwiftStay Budget', location, price: 5000, amenities: [] },
    ];

    // Apply budget filter if provided
    let filteredHotels = budget
      ? hotels.filter((hotel) => hotel.price <= budget)
      : hotels;

    // Apply amenities filter if provided
    if (amenities) {
      filteredHotels = filteredHotels.filter((hotel) =>
        amenities.every((a) => hotel.amenities.includes(a)),
      );
    }

    return filteredHotels;
  }

  // Generate a personalized welcome message
  async generateWelcomeMessage(userName: string) {
    return `Welcome to SwiftStay, ${userName}! We hope you enjoy your stay.`;
  }
}
