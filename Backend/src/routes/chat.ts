import { Router } from "express";

const router = Router();

// Example route
router.get("/", (req, res) => {
  res.send("Chat route works!");
});

export default router;
