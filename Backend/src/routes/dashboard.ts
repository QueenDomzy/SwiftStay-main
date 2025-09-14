import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Active rooms count
router.get("/active-rooms", async (req, res) => {
  try {
    const count = await prisma.room.count({ where: { available: true } });
    res.json({ activeRooms: count });
  } catch (err) {
    res.status(500).json({ error: "Failed to get active rooms" });
  }
});

// Total revenue
router.get("/revenue", async (req, res) => {
  try {
    const transactions = await prisma.payment.findMany();
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to get revenue" });
  }
});

// Recent bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true, room: true }
    });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Failed to get bookings" });
  }
});

// Recent transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: "Failed to get transactions" });
  }
});

export default router;
