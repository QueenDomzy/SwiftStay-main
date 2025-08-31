import Flutterwave from "flutterwave-node-v3";

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

router.post("/pay", async (req, res) => {
  const payload = {
    tx_ref: Date.now().toString(),
    amount: req.body.amount,
    currency: "NGN",
    redirect_url: "https://example.com/callback",
    customer: {
      email: req.body.email,
      phonenumber: req.body.phone,
      name: req.body.name,
    },
  };

  try {
    const response = await flw.Payment.initialize(payload);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
