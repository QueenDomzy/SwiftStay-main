import { Router } from "express";
import { prisma } from "../lib/prisma";

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

export default router;
