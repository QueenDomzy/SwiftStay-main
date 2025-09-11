import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create reservation
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, hotelId, checkIn, checkOut } = req.body;

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        hotelId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        status: "pending",
      },
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

// Get all reservations
router.get("/", async (req: Request, res: Response) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true,
        hotel: true,
      },
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

// Get a single reservation by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        hotel: true,
      },
    });

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching reservation" });
  }
});

// Update reservation status
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    const updated = await prisma.reservation.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update reservation" });
  }
});

// Delete reservation
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.reservation.delete({ where: { id } });
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete reservation" });
  }
});

export default router;
