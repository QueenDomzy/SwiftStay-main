import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookings"; // adjust path if needed

const app = express();

app.use(cors());            // allow frontend requests
app.use(express.json());    // parse JSON bodies

// Mount the bookings router at /api/bookings
app.use("/api/bookings", bookingRoutes);

// Optional: root route
app.get("/", (req, res) => {
  res.json({ message: "🚀 SwiftStay Backend is running!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
