import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // your login logic
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
