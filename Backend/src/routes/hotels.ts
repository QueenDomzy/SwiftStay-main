import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// Get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await prisma.hotel.findMany({ include: { rooms: true, owner: true } });
    res.json({ hotels });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// Create a hotel
router.post("/", async (req, res) => {
  const { name, location, description, ownerId } = req.body;
  try {
    const hotel = await prisma.hotel.create({
      data: { name, location, description, ownerId }
    });
    res.json({ hotel });
  } catch (err) {
    res.status(500).json({ error: "Failed to create hotel" });
  }
});

export default router;
