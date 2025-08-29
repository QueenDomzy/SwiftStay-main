// src/routes/reservations.ts
import { Router } from "express";
import prisma from "../utils/prismaClient";

const router = Router();

/**
 * Create a reservation.
 * Body: { name, email, date, userId? }
 * If userId is not provided we try to find or create a user by email.
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, date, userId } = req.body;
    if (!name || !email || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure a user exists (if userId not provided)
    let userIdToUse = userId;
    if (!userIdToUse) {
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: { name, email, password: "" } // password empty if using social/login later
        });
      }
      userIdToUse = user.id;
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: userIdToUse,
        name,
        email,
        date: new Date(date),
      },
      include: { user: true }
    });

    return res.status(201).json(reservation);
  } catch (err: any) {
    console.error("Create reservation error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

/**
 * Get all reservations (admin) or by user
 * Query: ?userId=...
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const where = userId ? { where: { userId: String(userId) } } : {};
    const reservations = await prisma.reservation.findMany({
      ...where,
      include: { user: true },
      orderBy: { id: "desc" }
    });
    return res.status(200).json(reservations);
  } catch (err: any) {
    console.error("Get reservations error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

export default router;