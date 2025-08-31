import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";
import flutterwaveRoutes from "./routes/flutterwave.routes";
import paystackRoutes from "./routes/paystack.routes";
import chatRoutes from "./chat/chat.routes"; // new chat route

dotenv.config(); // Load env

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/flutterwave", flutterwaveRoutes);
app.use("/paystack", paystackRoutes);
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
