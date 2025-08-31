import 'reflect-metadata';
import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";
import flutterwaveRoutes from "./routes/flutterwave.routes";
import * as dotenv from "dotenv";
import paystackRoutes from "./routes/paystack.routes"; // adjust path if needed
dotenv.config();

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY as string);

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
