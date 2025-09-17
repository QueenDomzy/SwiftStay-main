// src/reservations/dto/create-reservation.dto.ts
import { IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  userId!: number;

  hotelId!: number;

  checkInDate!: string;

  checkOutDate!: string;

  roomType!: string;
}
