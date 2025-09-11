import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create payment
router.post("/", async (req: Request, res: Response) => {
  try {
    const { bookingId, amount, method } = req.body;

    if (!bookingId || !amount || !method) {
      return res.status(400).json({ error: "bookingId, amount, and method are required" });
    }

    const payment = await prisma.payment.create({
      data: {
        bookingId,         // ✅ required by schema
        amount,
        method,
        status: "pending", // default until updated
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
});

// Get all payments
router.get("/", async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { booking: true }, // optional: fetch related booking
    });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

export default router;
