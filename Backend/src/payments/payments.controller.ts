import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)  
  @Post('initiate')
  async initiate(@Body() body: any) {
    const { reservationId, amount } = body;
    const reference = await this.paymentsService.initiatePayment(reservationId, amount);
    return { reference, paystackUrl: `https://checkout.paystack.com/${reference}` };
  }

  @Post('verify')
  async verify(@Body() body: any) {
    const { reference } = body;
    const result = await this.paymentsService.verifyPayment(reference);
    return result;
  }
}
