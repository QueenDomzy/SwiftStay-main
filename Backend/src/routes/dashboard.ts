import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Type for payments
type Transaction = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  transaction: string | null;
  method: string;
  amount: number;
  status: string;
  bookingId: string;
};

// Total active rooms
router.get("/active-rooms", async (req, res) => {
  try {
    const activeRooms = await prisma.room.count({ where: { available: true } });
    res.json({ activeRooms });
  } catch (err) {
    res.status(500).json({ error: "Failed to get active rooms", details: err });
  }
});

// Total revenue
router.get("/revenue", async (req, res) => {
  try {
    const payments: Transaction[] = await prisma.payment.findMany();
    const totalRevenue = payments.reduce((sum, t) => sum + t.amount, 0);
    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to get revenue", details: err });
  }
});

// Booking trends for past 7 days
router.get("/booking-trends", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany();

    // Generate past 7 days
    const past7Days: Date[] = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    });

    const bookingTrendData = past7Days.map((d) => ({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      bookings: bookings.filter(
        (b) =>
          b.createdAt.toDateString() === d.toDateString()
      ).length,
    }));

    res.json({ bookingTrendData });
  } catch (err) {
    res.status(500).json({ error: "Failed to get booking trends", details: err });
  }
});

export default router;
