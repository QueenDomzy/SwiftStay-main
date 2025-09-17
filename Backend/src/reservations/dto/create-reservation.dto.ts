// src/reservations/dto/create-reservation.dto.ts
import { IsInt, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  userId!: number;

  @IsInt()
  hotelId!: number;

  @IsDateString()
  checkInDate!: string;

  @IsDateString()
  checkOutDate!: string;

  @IsString()
  @IsNotEmpty()
  roomType!: string;
}
