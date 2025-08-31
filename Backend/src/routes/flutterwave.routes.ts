import { Router, Request, Response } from "express";
import { FlutterwaveService } from "../services/flutterwave.service";

const router = Router();
const flutterwaveService = new FlutterwaveService();

router.post("/initialize", async (req: Request, res: Response) => {
  try {
    const { email, amount, txRef, redirectUrl } = req.body;
    const payment = await flutterwaveService.initializePayment(email, amount, txRef, redirectUrl);
    res.json(payment);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/verify/:txRef", async (req: Request, res: Response) => {
  try {
    const { txRef } = req.params;
    const verification = await flutterwaveService.verifyPayment(txRef);
    res.json(verification);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
