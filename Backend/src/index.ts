import "reflect-metadata";
import "dotenv/config";              // ✅ one-liner config
import express from "express";

import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";
import flutterwaveRoutes from "./routes/flutterwave.routes";
import paystackRoutes from "./routes/paystack.routes";
import chatRoutes from "./chat/chat.module";  // default router

import Flutterwave from "flutterwave-node-v3";
import Paystack from "paystack-api";

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY as string);

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY as string,
  process.env.FLW_SECRET_KEY as string
);

export class PaystackService {
  async initializePayment(data: any) {
    return await paystack.transaction.initialize(data);
  }
  async verifyPayment(reference: string) {
    return await paystack.transaction.verify({ reference });
  }
}

const app = express();
app.use(express.json());

// Routes
app.use("/paystack", paystackRoutes);
app.use("/flutterwave", flutterwaveRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/chat", chatRoutes);   // ✅ works with our chat.module.ts

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 SwiftStay API is running on port ${PORT}`);
});
