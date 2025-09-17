// src/bookings/dto/create-booking.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  userId: number;

  @IsInt()
  hotelId: number;

  @IsNotEmpty()
  roomType: string;

  @IsInt()
  numberOfGuests: number;
}
