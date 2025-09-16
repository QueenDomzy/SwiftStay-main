// src/bookings/dto/create-booking.dto.ts
export class CreateBookingDto {
  guestName!: string;
  checkIn!: string;  // ISO date string
  checkOut!: string;
  hotelId!: number;
  roomId!: number;
}
