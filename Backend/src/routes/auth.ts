import { Router } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// Register a user
router.post("/register", async (req, res) => {
  const { name, email, password, isOwner } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, isOwner }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d"
    });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
});

export default router;
