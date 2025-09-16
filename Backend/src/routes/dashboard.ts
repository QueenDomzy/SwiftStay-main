import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Use Prisma’s generated types instead of custom duplicates
import type { Payment, Booking } from "@prisma/client";

// Total active rooms
router.get("/active-rooms", async (req, res) => {
  try {
    const activeRooms = await prisma.room.count({
      where: { available: true },
    });
    res.json({ activeRooms });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get active rooms", details: err });
  }
});

// Total revenue
router.get("/revenue", async (req, res) => {
  try {
    const payments: Payment[] = await prisma.payment.findMany();
    const totalRevenue = payments.reduce(
      (sum: number, t: Payment) => sum + t.amount,
      0
    );
    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to get revenue", details: err });
  }
});

// Booking trends for past 7 days
router.get("/booking-trends", async (req, res) => {
  try {
    const bookings: Booking[] = await prisma.booking.findMany();

    // Generate past 7 days
    const past7Days: Date[] = Array.from({ length: 7 }, (_, i: number) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    });

    const bookingTrendData = past7Days.map((d: Date) => ({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      bookings: bookings.filter(
        (b: Booking) => b.createdAt.toDateString() === d.toDateString()
      ).length,
    }));

    res.json({ bookingTrendData });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get booking trends", details: err });
  }
});

export default router;
