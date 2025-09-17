import axios from "axios";

export async function searchHotels(query: string) {
  try {
    const response = await axios.get(`https://example.com/api/hotels?q=${query}`);
    return response.data;
  } catch (error: any) {
    console.error("Hotel search error:", error?.message || error);
    throw new Error("Failed to fetch hotels");
  }
}
