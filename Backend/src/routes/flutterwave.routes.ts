import { Router, Request, Response } from "express";

const router = Router();

// Example route for Flutterwave webhook
router.post("/webhook", (req: Request, res: Response) => {
  try {
    const event = req.body;
    console.log("Flutterwave webhook:", event);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Webhook handling failed" });
  }
});

export default router;
