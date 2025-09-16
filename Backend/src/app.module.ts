// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { HotelsModule } from './hotels/hotels.module';
import { BookingsModule } from './bookings/bookings.module';
import { Hotel } from './hotels/hotel.entity';
import { Booking } from './bookings/booking.entity';

@Module({
  imports: [
    // Load .env or Render environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Connect to Postgres via DATABASE_URL
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // Only for development; disable in production
      }),
    }),

    // Feature modules with entities
    TypeOrmModule.forFeature([Hotel, Booking]),

    // App modules
    HotelsModule,
    BookingsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
