import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// =======================
// Reservations Routes
// =======================

// Get all reservations
router.get("/reservations", async (req, res) => {
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

// Create a reservation
router.post("/reservations", async (req, res) => {
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

// =======================
// Payments Routes
// =======================

// Get all payments
router.get("/payments", async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { booking: true }
    });

    // Calculate total revenue
    const totalRevenue = payments.reduce(
      (sum: number, t: Transaction) => sum + t.amount,
      0
    );

    res.json({ payments, totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// Create a payment
router.post("/payments", async (req, res) => {
  const { bookingId, amount, method, status, transaction } = req.body;
  try {
    const payment = await prisma.payment.create({
      data: { bookingId, amount, method, status, transaction }
    });
    res.json({ payment });
  } catch (err) {
    res.status(500).json({ error: "Failed to create payment" });
  }
});

export default router;

// =======================
// Transaction type
// =======================
type Transaction = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  transaction: string | null;
  method: string;
  amount: number;
  status: string;
  bookingId: string;
};
