import { Router, Request, Response } from "express";
import Flutterwave from "flutterwave-node-v3";
import crypto from "crypto";

const router = Router();
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY as string,
  process.env.FLW_SECRET_KEY as string
);

/**
 * Initialize a payment (Hosted Checkout flow)
 */
router.post("/pay", async (req: Request, res: Response) => {
  const payload = {
    tx_ref: Date.now().toString(),
    amount: req.body.amount,
    currency: "NGN",
    redirect_url: "https://yourdomain.com/api/flutterwave/verify", // auto verify endpoint
    customer: {
      email: req.body.email,
      phonenumber: req.body.phone,
      name: req.body.name,
    },
  };

  try {
    const response = await flw.Payment.initialize(payload);
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Charge a card directly (PIN/OTP flow)
 */
router.post("/charge-card", async (req: Request, res: Response) => {
  try {
    const response = await flw.Charge.card(req.body);
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Auto verify payment after redirect
 */
router.get("/verify", async (req: Request, res: Response) => {
  const { transaction_id } = req.query;

  if (!transaction_id) {
    return res.status(400).json({ error: "Missing transaction_id" });
  }

  try {
    const response = await flw.Transaction.verify({ id: transaction_id });
    if (response.status === "success" && response.data.status === "successful") {
      // ✅ Payment successful — update DB here
      return res.json({ success: true, data: response.data });
    } else {
      return res.status(400).json({ success: false, data: response.data });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Webhook listener (server-to-server confirmation)
 */
router.post("/webhook", async (req: Request, res: Response) => {
  const secretHash = process.env.FLW_WEBHOOK_SECRET as string;
  const signature = req.headers["verif-hash"];

  // 🔒 Verify Flutterwave signature
  if (!signature || signature !== secretHash) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  const payload = req.body;

  if (payload.event === "charge.completed") {
    const tx = payload.data;

    if (tx.status === "successful") {
      // ✅ Confirmed payment — update DB/order
      console.log("Payment successful via webhook:", tx);
    } else {
      console.log("Payment failed/cancelled via webhook:", tx);
    }
  }

  // Always respond 200 so Flutterwave doesn’t retry endlessly
  res.status(200).json({ received: true });
});

export default router;
