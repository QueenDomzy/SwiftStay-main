// src/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../services/email.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async initiatePayment(createPaymentDto: CreatePaymentDto) {
    // Save payment attempt in DB
    const payment = await this.prisma.payment.create({
      data: createPaymentDto,
    });

    // Example: send confirmation email
    await this.emailService.sendPaymentConfirmation(payment.email, payment.amount);

    return {
      message: 'Payment initiated successfully',
      paymentId: payment.id,
    };
  }

  async findAll() {
    return this.prisma.payment.findMany();
  }

  async findOne(id: number) {
    return this.prisma.payment.findUnique({ where: { id } });
  }
      }
