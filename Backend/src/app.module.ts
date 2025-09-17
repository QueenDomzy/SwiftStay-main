// src/app.module.ts
import { Module } from '@nestjs/common';

// Modules
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './bookings/booking.module';
import { HotelModule } from './hotels/hotel.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { AiModule } from './ai/ai.module';

// Services
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    BookingModule,
    HotelModule,
    ReservationsModule,
    PaymentsModule,
    AiModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
