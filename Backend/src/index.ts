import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/auth";
import bookingsRoutes from "./routes/bookings";
import flutterwaveRoutes from "./routes/flutterwave.routes";
import paystackRoutes from "./routes/paystack.routes";
import chatRoutes from "./routes/chat";
import dashboardRoutes from "./routes/dashboard";
import hotelsRoutes from "./routes/hotels";
import paymentsRoutes from "./routes/payments";
import reservationsRoutes from "./routes/reservations";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/flutterwave", flutterwaveRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/reservations", reservationsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("SwiftStay Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
