export class CreateReservationDto {
  userId!: number;
  hotelId!: number;
  roomType!: string;
  checkIn!: Date;
  checkOut!: Date;
  totalPrice!: number;
}
