import { Router, Request, Response } from "express";
import { PaystackService } from "../services/paystack.service";

const router = Router();
const paystackService = new PaystackService();

// 🔹 Initialize Payment
router.post("/pay", async (req: Request, res: Response) => {
  try {
    const response = await paystackService.initializePayment(req.body);
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Verify Payment + Auto Redirect
router.get("/verify/:reference", async (req: Request, res: Response) => {
  try {
    const response = await paystackService.verifyPayment(req.params.reference);

    if (response.data.status === "success") {
      // ✅ Redirect to success page
      return res.redirect(`https://your-frontend.com/payment-success?ref=${req.params.reference}`);
    } else {
      // ❌ Redirect to failure/cancel page
      return res.redirect(`https://your-frontend.com/payment-failed?ref=${req.params.reference}`);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Charge Customer (with authorization_code)
router.post("/charge", async (req: Request, res: Response) => {
  try {
    const { email, amount, authorization_code } = req.body;
    const response = await paystackService.chargeCustomer({ email, amount, authorization_code });
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
