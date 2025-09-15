// backend/index.ts
import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookings"; // adjust path if needed

const app = express();

// Enable CORS so frontend can fetch data
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Mount bookings router at /api/bookings
app.use("/api/bookings", bookingRoutes);

// Root route for testing backend status
app.get("/", (req, res) => {
  res.json({ message: "🚀 SwiftStay Backend is running!" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
