import Paystack from "paystack-api";
import dotenv from "dotenv";

dotenv.config();

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY as string);

export class PaystackService {
  async initializePayment(email: string, amount: number, callbackUrl: string) {
    try {
      const response = await paystack.transaction.initialize({
        email,
        amount: amount * 100, // Paystack uses kobo
        callback_url: callbackUrl,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Paystack initialize payment failed");
    }
  }

  async verifyPayment(reference: string) {
    try {
      const response = await paystack.transaction.verify({ reference });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Paystack verification failed");
    }
  }
        }
