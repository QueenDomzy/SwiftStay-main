import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import fetch from 'node-fetch'; // npm i node-fetch@2

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async initiatePayment(reservationId: number, amount: number) {
    const reference = `SS-${Date.now()}`;
    // Save as pending first
    await this.prisma.payment.create({
      data: { reservationId, amount, reference, status: 'pending' },
    });
    return reference;
  }

  async verifyPayment(reference: string) {
    // Verify with Paystack
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const data = await res.json();

    if (data.status && data.data.status === 'success') {
      // Update payment status to success
      await this.prisma.payment.update({
        where: { reference },
        data: { status: 'success' },
      });

      // Update reservation status to confirmed
      await this.prisma.reservation.update({
        where: { id: data.data.metadata.reservationId },
        data: { status: 'confirmed' },
      });

      return { success: true };
    } else {
      // Mark payment as failed
      await this.prisma.payment.update({
        where: { reference },
        data: { status: 'failed' },
      });
      return { success: false, message: data.message };
    }
  }
             }
