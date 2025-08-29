import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const hotels = await prisma.hotel.findMany({ include: { rooms: true } });
  res.json(hotels);
});

router.post("/", async (req, res) => {
  try {
    const { name, description, location, ownerId } = req.body;
    const hotel = await prisma.hotel.create({
      data: { name, description, location, ownerId },
    });
    res.json(hotel);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;