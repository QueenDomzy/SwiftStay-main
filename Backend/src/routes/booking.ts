import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create booking
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, hotelId, reservationId } = req.body;

    const booking = await prisma.booking.create({
      data: {
        userId,
        hotelId,
        reservationId,
        status: "confirmed",
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Get all bookings
router.get("/", async (_req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true, hotel: true, reservation: true, payments: true },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

export default router;
