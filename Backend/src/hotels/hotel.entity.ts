import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
  @Column()
  name!: string;

  @Column()
  location!: string;

  @OneToMany(() => Booking, (booking) => booking.hotel)
  bookings!: Booking[];
}

// Export explicitly
export type { Hotel };import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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
