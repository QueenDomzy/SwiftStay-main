import { Injectable } from '@nestjs/common';
import Paystack from 'paystack-api';

@Injectable()
export class PaymentsService {
  private paystack = Paystack(process.env.PAYSTACK_SECRET);

    async initializePayment(email: string, amount: number) {
        return await this.paystack.transaction.initialize({
              email,
                    amount: amount * 100, // amount in kobo
                        });
                          }
                          }
