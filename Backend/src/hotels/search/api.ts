import { Request, Response } from 'express';

export const searchHotels = async (req: Request, res: Response) => {
 try {
  const response = await axios.get(url);
  return response.data;
} 
 catch (error) {
  if (error instanceof Error) {
    console.error("Hotel search error:", error.message);
  } else {
    console.error("Hotel search error:", error);
  }
  throw new Error("Failed to fetch hotels");
 } 
