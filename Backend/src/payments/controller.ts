import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

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
