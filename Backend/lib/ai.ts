import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getHotelRecommendations(userPreferences: string) {
    const prompt = `
      Suggest the top 5 hotels in Nigeria for a user with the following preferences:
      ${userPreferences}
      Provide hotel name, city, and a short description.
    `;

    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 300,
    });

    return response.data.choices[0].text?.trim();
  }

  async getPricingSuggestion(hotelName: string, occupancy: number) {
    const prompt = `
      Suggest a competitive price for ${hotelName} given current occupancy of ${occupancy}%.
    `;

    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    });

    return response.data.choices[0].text?.trim();
  }
}
