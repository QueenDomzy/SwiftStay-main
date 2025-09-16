import { Hotel } from "../hotels/hotel.entity";

export class Booking {
  id: number;
  guestName: string;
  checkInDate: Date;
  checkOutDate: Date;
  hotelId: number;

  // Relation
  hotel?: Hotel;
}
