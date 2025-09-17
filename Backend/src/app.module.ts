import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './bookings/bookings.module';
import { HotelModule } from './hotels/hotels.module';
import { AiModule } from './ai/ai.module';
import { PaymentsModule } from './payments/payments.module';
import { ReservationsModule } from './reservations/reservations.module';
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
