import { Router } from "express";
import prisma from "../prisma";  // ✅ default import, not { prisma }
const router = Router();

// Create a booking
router.post("/", async (req, res) => {
  try {
    const { userId, roomId, startDate, endDate } = req.body;

    const booking = await prisma.booking.create({
      data: {
        userId,
        roomId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "pending",
      },
    });

    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: "Failed to create booking", details: err });
  }
});

// Get bookings with room + hotel info
router.get("/", async (_req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        room: {
          include: {
            hotel: true,
          },
        },
      },
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings", details: err });
  }
});

export default router;
