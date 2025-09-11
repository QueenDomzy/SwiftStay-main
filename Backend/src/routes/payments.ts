import { Router, Request, Response } from "express";
import prisma from "../prisma";  // ✅ default import, not { prisma }
const router = Router();

// Create payment for a booking
router.post("/", async (req: Request, res: Response) => {
  try {
    const { bookingId, amount, method, userId } = req.body;

    // Ensure booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        method,
        status: "pending",
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
      include: {
        booking: {
          include: {
            user: true,
            room: true,
          },
        },
      },
    });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// Update payment status (e.g., after confirmation from Paystack/Flutterwave)
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: { status },
    });

    res.json(updatedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update payment" });
  }
});

export default router;
