import { Module } from '@nestjs/common';

// Core Services
import { PrismaService } from './prisma/prisma.service';

// Feature Modules
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { BookingsModule } from './bookings/bookings.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    AuthModule,
    HotelsModule,
    BookingsModule,
    ReservationsModule,
    PaymentsModule,
    AiModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
