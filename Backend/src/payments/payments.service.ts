// src/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../services/email.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async initiatePayment(userId: number, amount: number) {
    // Example: Save payment and send email
    const payment = await this.prisma.payment.create({
      data: { userId, amount },
    });

    await this.emailService.sendPaymentConfirmation(userId, payment);
    return payment;
  }
}
