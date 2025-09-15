import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookings";
import dashboardRoutes from "./routes/dashboard";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
