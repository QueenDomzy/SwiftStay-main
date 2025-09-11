import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all hotels
router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await prisma.hotel.findMany();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// Get single hotel by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const hotelId = Number(req.params.id);
    const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Error fetching hotel" });
  }
});

// Create a new hotel
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, location, price } = req.body;

    const newHotel = await prisma.hotel.create({
      data: { name, location, price }
    });

    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to create hotel" });
  }
});

export default router;
