import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

// GET active rooms
router.get("/active-rooms", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json({ activeRooms: rooms.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// GET total revenue
router.get("/revenue", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    const revenue = transactions.reduce((sum: number, t: { amount: number; createdAt: string }) => sum + t.amount, 0);    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch revenue" });
  }
});

// GET bookings (ordered by createdAt)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// GET transactions (ordered by createdAt)
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

export default prisma;
