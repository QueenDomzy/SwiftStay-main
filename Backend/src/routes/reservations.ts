import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { user: true, hotel: true },
      orderBy: { date: "desc" }
    });
    res.json({ reservations });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

// Create reservation
router.post("/", async (req, res) => {
  const { userId, hotelId, date } = req.body;
  try {
    const reservation = await prisma.reservation.create({
      data: { userId, hotelId, date: new Date(date) }
    });
    res.json({ reservation });
  } catch (err) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

export default router;
