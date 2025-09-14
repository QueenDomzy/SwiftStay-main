import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";
import flutterwaveRoutes from "./routes/flutterwave.routes";
import paystackRoutes from "./routes/paystack.routes";
import chatRoutes from "./chat/chat.routes";
import dashboardRoutes from "./routes/dashboard"; // ✅ move up

dotenv.config(); // Load env

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/flutterwave", flutterwaveRoutes);
app.use("/paystack", paystackRoutes);
app.use("/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ register before listen

// Mock transactions endpoint (optional)
app.get("/api/transactions", (req, res) => {
  res.json([
    { id: "1", method: "Paystack", amount: 5000 },
    { id: "2", method: "Flutterwave", amount: 12000 }
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";
import flutterwaveRoutes from "./routes/flutterwave.routes";
import paystackRoutes from "./routes/paystack.routes";
import chatRoutes from "./chat/chat.routes";
import dashboardRoutes from "./routes/dashboard"; // ✅ move up

dotenv.config(); // Load env

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/flutterwave", flutterwaveRoutes);
app.use("/paystack", paystackRoutes);
app.use("/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ register before listen

// Mock transactions endpoint (optional)
app.get("/api/transactions", (req, res) => {
  res.json([
    { id: "1", method: "Paystack", amount: 5000 },
    { id: "2", method: "Flutterwave", amount: 12000 }
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservations";
import flutterwaveRoutes from "./routes/flutterwave.routes";
import paystackRoutes from "./routes/paystack.routes";
import chatRoutes from "./chat/chat.routes";
import dashboardRoutes from "./routes/dashboard"; // ✅ move up

dotenv.config(); // Load env

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/flutterwave", flutterwaveRoutes);
app.use("/paystack", paystackRoutes);
app.use("/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ register before listen

// Mock transactions endpoint (optional)
app.get("/api/transactions", (req, res) => {
  res.json([
    { id: "1", method: "Paystack", amount: 5000 },
    { id: "2", method: "Flutterwave", amount: 12000 }
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
