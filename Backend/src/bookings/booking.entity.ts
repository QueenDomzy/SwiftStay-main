import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // use ! to satisfy strict TS checks

  @Column()
  name!: string;

  @Column()
  location!: string;

  @OneToMany(() => Booking, (booking) => booking.hotel)
  bookings!: Booking[];
  }
