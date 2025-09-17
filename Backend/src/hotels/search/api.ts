import { Request, Response } from 'express';

export const searchHotels = async (req: Request, res: Response) => {
 try {
  const response = await axios.get(url);
  return response.data;
} catch (error: any) {
  console.error("Hotel search error:", error?.message || error);
  throw new Error("Failed to fetch hotels");
} 
