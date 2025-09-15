import { Module } from '@nestjs/common';
import { BookingsModule } from './bookings/bookings.module';
import { AppController } from './app.controller';

@Module({
  imports: [BookingsModule],   // keep your bookings features
  controllers: [AppController], // add AppController
  providers: [],
})
export class AppModule {}
