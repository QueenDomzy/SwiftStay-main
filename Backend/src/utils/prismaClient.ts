import { Router, Request, Response } from "express";
import { PrismaClient, Room, Transaction, Reservation } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// GET active rooms
router.get("/active-rooms", async (req: Request, res: Response) => {
  try {
    const rooms: Room[] = await prisma.room.findMany();
    res.json({ activeRooms: rooms.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms", details: err });
  }
});

// GET total revenue
router.get("/revenue", async (req: Request, res: Response) => {
  try {
    const transactions: Transaction[] = await prisma.transaction.findMany();
    const totalRevenue = transactions.reduce(
      (sum: number, t: Transaction) => sum + t.amount,
      0
    );
    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch revenue", details: err });
  }
});

// GET bookings (ordered by createdAt)
router.get("/bookings", async (req: Request, res: Response) => {
  try {
    const bookings: Reservation[] = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings", details: err });
  }
});

// GET transactions (ordered by createdAt)
router.get("/transactions", async (req: Request, res: Response) => {
  try {
    const transactions: Transaction[] = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ transactions });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch transactions", details: err });
  }
});

export default router;
