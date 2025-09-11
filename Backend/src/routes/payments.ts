import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create payment
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, amount, method } = req.body;

    const payment = await prisma.payment.create({
      data: { userId, amount, method }
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Payment failed" });
  }
});

// Get all payments
router.get("/", async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

export default router;
