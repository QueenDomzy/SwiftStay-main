// src/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../services/email.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService, EmailService],
})
export class PaymentsModule {}
