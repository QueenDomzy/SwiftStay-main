import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  guestName!: string;

  @Column({ type: 'date' })
  checkInDate!: string;

  @Column({ type: 'date' })
  checkOutDate!: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
  hotel!: Hotel;
}
