import { Router, Request, Response } from "express";
import { PaystackService } from "../services/paystack.service";

const router = Router();
const paystackService = new PaystackService();

router.post("/initialize", async (req: Request, res: Response) => {
  try {
    const { email, amount, callbackUrl } = req.body;
    const payment = await paystackService.initializePayment(email, amount, callbackUrl);
    res.json(payment);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/verify/:reference", async (req: Request, res: Response) => {
  try {
    const { reference } = req.params;
    const verification = await paystackService.verifyPayment(reference);
    res.json(verification);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
