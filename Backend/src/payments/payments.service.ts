import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import fetch from 'node-fetch'; // npm i node-fetch@2
import { EmailService } from '../email/email.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async verifyPayment(reference: string) {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const data = await res.json();

    if (data.status && data.data.status === 'success') {
      // Update payment status
      await this.prisma.payment.update({
        where: { reference },
        data: { status: 'success' },
      });

      // Update reservation status
      const reservation = await this.prisma.reservation.update({
        where: { id: data.data.metadata.reservationId },
        data: { status: 'confirmed' },
      });

      // Send confirmation to user
      await this.emailService.sendMail(
        data.data.customer.email, // user's email from Paystack metadata
        'Booking Confirmed',
        `Your booking at hotel ID ${reservation.hotelId} is confirmed from ${reservation.checkIn} to ${reservation.checkOut}.`
      );

      // Send notification to hotel (fetch hotel email from DB)
      const hotel = await this.prisma.hotel.findUnique({ where: { id: reservation.hotelId } });
      await this.emailService.sendMail(
        hotel?.email || 'hotel@example.com',
        'New Booking Received',
        `You have a new booking for your hotel from ${reservation.checkIn} to ${reservation.checkOut}.`
      );

      return { success: true };
    } else {
      await this.prisma.payment.update({
        where: { reference },
        data: { status: 'failed' },
      });
      return { success: false, message: data.message };
    }
  }
  }
