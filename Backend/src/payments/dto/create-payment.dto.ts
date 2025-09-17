// src/payments/dto/create-payment.dto.ts
import { IsEmail, IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  userId!: string;

  @IsEmail()
  email!: string;

  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  currency!: string;

  @IsString()
  paymentMethod!: string;
}
