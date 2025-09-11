import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name || "Unnamed", // ✅ add name (required in schema)
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
