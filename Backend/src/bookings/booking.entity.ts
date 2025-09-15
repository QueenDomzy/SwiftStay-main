// src/bookings/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guestName: string;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  @ManyToOne(() => Hotel, hotel => hotel.bookings, { onDelete: 'CASCADE' })
  hotel: Hotel;
}
