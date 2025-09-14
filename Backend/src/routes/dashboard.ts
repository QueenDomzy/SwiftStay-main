import { Router } from "express";
import prisma from "../prisma"; // if you use Prisma

const router = Router();

// Active rooms
router.get("/active-rooms", async (req, res) => {
  try {
    const activeRooms = await prisma.room.count({ where: { status: "active" } });
    res.json({ activeRooms });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch active rooms" });
  }
});

// Total revenue
router.get("/revenue", async (req, res) => {
  try {
    const revenue = await prisma.payment.aggregate({
      _sum: { amount: true }
    });
    res.json({ totalRevenue: revenue._sum.amount || 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenue" });
  }
});

// Recent bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 5
    });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Recent transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 5
    });
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

export default router;
