// src/routes/dashboard.ts
import { Router } from "express";
import prisma from "../utils/prismaClient";

const router = Router();

// Example: Fetch dashboard stats
router.get("/", async (req, res) => {
  try {
    const hotelsCount = await prisma.hotel.count();
    const roomsCount = await prisma.room.count();
    const bookingsCount = await prisma.booking.count();
    const reservationsCount = await prisma.reservation.count();
    const paymentsCount = await prisma.payment.count();
    const transactionsCount = await prisma.transaction.count();

    res.json({
      hotels: hotelsCount,
      rooms: roomsCount,
      bookings: bookingsCount,
      reservations: reservationsCount,
      payments: paymentsCount,
      transactions: transactionsCount,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
