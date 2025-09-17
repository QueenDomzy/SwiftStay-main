// src/services/email.service.ts
import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // NOTE: Use real SMTP settings in production (from env variables)
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || 'user',
        pass: process.env.SMTP_PASS || 'pass',
      },
    });
  }

  async sendPaymentConfirmation(email: string, amount: number) {
    // simple send — in prod build template and better handling
    const info = await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@swiftstay.ng',
      to: email,
      subject: 'Payment Confirmation - SwiftStay',
      text: `We received your payment of ${amount}. Thank you.`,
    });
    return info;
  }
      }
