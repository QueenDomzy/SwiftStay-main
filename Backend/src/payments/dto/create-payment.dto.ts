// src/payments/dto/create-payment.dto.ts
import { IsEmail, IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  readonly userId: string;

  @IsEmail()
  readonly email: string;

  @IsNumber()
  @Min(1)
  readonly amount: number;

  @IsString()
  readonly currency: string;

  @IsString()
  readonly paymentMethod: string;
}
