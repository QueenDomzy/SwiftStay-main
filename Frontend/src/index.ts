import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookings";
import dashboardRoutes from "./routes/dashboard";
import reservationRoutes from "./routes/reservations";

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
