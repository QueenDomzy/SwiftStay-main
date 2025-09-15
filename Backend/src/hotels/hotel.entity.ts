// src/hotels/hotel.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @OneToMany(() => Booking, booking => booking.hotel)
  bookings: Booking[];
                          }
