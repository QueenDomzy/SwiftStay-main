import { Request, Response } from 'express';

export const searchHotels = async (req: Request, res: Response) => {
  try {
    // your search logic here
    res.json({ message: 'Search successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
