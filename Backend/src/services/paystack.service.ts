import Paystack from "paystack-api";

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY as string);

export class PaystackService {
  // 🔹 Initialize payment
  async initializePayment(data: any) {
    return await paystack.transaction.initialize(data);
  }

  // 🔹 Verify payment
  async verifyPayment(reference: string) {
    return await paystack.transaction.verify({ reference });
  }

  // 🔹 Charge an authorization code (e.g., saved card)
  async chargeCustomer(data: { email: string; amount: number; authorization_code: string }) {
    return await paystack.transaction.charge(data);
  }
}
