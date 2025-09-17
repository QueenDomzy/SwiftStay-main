// src/bookings/dto/create-booking.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  userId!: number;

  hotelId!: number;

  roomType!: string;

  numberOfGuests!: number;
}
