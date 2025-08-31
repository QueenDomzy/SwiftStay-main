import 'reflect-metadata';
import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";
import flutterwaveRoutes from "./routes/flutterwave.routes";
import Flutterwave from "flutterwave-node-v3";
import * as dotenv from "dotenv";
Import Paystack from "paystack-api";
import paystackRoutes from "./routes/paystack.routes"; // adjust path if needed
dotenv.config();
Import express from "express";

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY as string);
const flw = new
Flutterwave(PROCESS.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 SwiftStay API is running on port ${PORT}`);
});
