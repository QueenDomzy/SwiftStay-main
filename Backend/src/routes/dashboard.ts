import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

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

// Total revenue
router.get("/revenue", async (req, res) => {
  try {
    const transactions: Transaction[] = await prisma.payment.findMany();

    const totalRevenue = transactions.reduce(
      (sum: number, t: Transaction) => sum + t.amount,
      0
    );

    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to get revenue", details: err });
  }
});

// Booking trends (past 7 days)
router.get("/booking-trends", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany();

    const past7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    });

    const bookingTrendData = past7Days.map((d) => ({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      bookings: bookings.filter(
        (b) =>
          b.createdAt.toDateString() === d.toDateString() // compare Date objects
      ).length,
    }));

    res.json({ bookingTrendData });
  } catch (err) {
    res.status(500).json({ error: "Failed to get booking trends", details: err });
  }
});

export default router;
