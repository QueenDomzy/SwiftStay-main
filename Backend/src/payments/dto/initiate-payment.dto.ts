// src/payments/dto/initiate-payment.dto.ts
import { IsInt, IsPositive } from 'class-validator';

export class InitiatePaymentDto {
  @IsInt()
  userId!: number;

  @IsPositive()
  amount!: number;
}
