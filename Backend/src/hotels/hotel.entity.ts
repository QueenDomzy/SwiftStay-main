import { Booking } from "../bookings/booking.entity";

export class Hotel {
  id!: number;
  name!: string;
  location!: string;
  roomsAvailable!: number;

  // Relation
  bookings?: Booking[];
}
