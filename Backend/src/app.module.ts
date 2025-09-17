import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './bookings/bookings.module';
import { PaymentModule } from './payments/payments.module';
import { HotelModule } from './hotels/hotels.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, BookingModule, PaymentModule, HotelModule],
  providers: [PrismaService],
})
export class AppModule {}
