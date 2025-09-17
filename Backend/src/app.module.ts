import { HotelModule } from './hotels/hotels.module';

@Module({
  imports: [HotelModule, AuthModule, BookingModule, PaymentModule],
})
export class AppModule {}
