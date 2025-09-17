// src/payments/dto/create-payment.dto.ts
import { IsEmail, IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  userId!: string;
  email!: string;
  amount!: number;
  currency!: string;
  paymentMethod!: string;
}
