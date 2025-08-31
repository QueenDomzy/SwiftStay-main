import 'reflect-metadata';
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SwiftStay API is running on port ${PORT}`);
});
