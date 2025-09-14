import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true, room: true }
    });

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Create a booking
router.post("/", async (req, res) => {
  const { userId, roomId, startDate, endDate } = req.body;
  try {
    const booking = await prisma.booking.create({
      data: {
        userId,
        roomId,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking", details: err });
  }
});

// Example: Booking trend for past 7 days
type Booking = {
  id: string;
  userId: string;
  roomId: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

const past7Days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - i);
  return d;
});

async function getBookingTrend() {
  const bookings: Booking[] = await prisma.booking.findMany();

  const bookingTrendData = past7Days.map(d => ({
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    bookings: bookings.filter(b => b.createdAt.toDateString() === d.toDateString()).length
  }));

  return bookingTrendData;
}

export default router;
