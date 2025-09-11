import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all hotels
router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await prisma.hotel.findMany({
      include: { rooms: true, owner: true }, // optional: fetch related data
    });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// Get single hotel by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id; // ✅ id is String (uuid)
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { rooms: true, owner: true }, // optional
    });

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
    const { name, location, description, rating, ownerId } = req.body;

    const newHotel = await prisma.hotel.create({
      data: {
        name,
        location,
        description: description || null,
        rating: rating ?? 0.0, // ✅ fallback
        ownerId: ownerId || null, // ✅ optional owner
      },
    });

    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to create hotel" });
  }
});

export default router;
