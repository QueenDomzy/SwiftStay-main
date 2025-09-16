// src/routes/dashboard.ts
import express, { Request, Response } from "express";
import prisma from "../utils/prismaClient";

// Import only types (for type safety)
import type { Booking, Payment, Room, Reservation, Transaction, Hotel } from "@prisma/client";

const router = express.Router();

// Example: Get dashboard summary
router.get("/summary", async (req: Request, res: Response) => {
  try {
    const [hotels, bookings, payments, reservations, transactions] = await Promise.all([
      prisma.hotel.findMany(),
      prisma.booking.findMany(),
      prisma.payment.findMany(),
      prisma.reservation.findMany(),
      prisma.transaction.findMany(),
    ]);

    res.json({
      totalHotels: hotels.length,
      totalBookings: bookings.length,
      totalPayments: payments.length,
      totalReservations: reservations.length,
      totalTransactions: transactions.length,
      latestBookings: bookings.slice(-5),
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
