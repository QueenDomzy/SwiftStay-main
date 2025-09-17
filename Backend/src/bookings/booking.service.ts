import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateReservationDto } from './dto/reservation.dto';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService
  ) {}

  async createReservation(data: CreateReservationDto) {
    const overlapping = await this.prisma.reservation.findFirst({
      where: {
        hotelId: data.hotelId,
        roomType: data.roomType,
        status: 'confirmed',
        OR: [
          {
            checkIn: { lte: data.checkOut },
            checkOut: { gte: data.checkIn },
          },
        ],
      },
    });

    if (overlapping) {
      // Use AI service to recommend alternatives
      const recommendations = await this.aiService.getHotelRecommendations(
        `Looking for hotels similar to hotelId ${data.hotelId}`
      );
      throw new Error(
        `Selected room is not available. Recommended alternatives: ${recommendations}`
      );
    }

    return this.prisma.reservation.create({ data });
  }
  }
