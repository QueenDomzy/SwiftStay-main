import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create reservation
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, hotelId, checkIn, checkOut } = req.body;

    const reservation = await prisma.reservation.create({
      data: { userId, hotelId, checkIn, checkOut }
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

// Get all reservations
router.get("/", async (req: Request, res: Response) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

export default router;
