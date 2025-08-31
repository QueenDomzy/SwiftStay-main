import 'reflect-metadata';
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";
import paystackRoutes from "./routes/paystack.routes";
import flutterwaveRoutes from "./routes/flutterwave.routes";

dotenv.config();

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
