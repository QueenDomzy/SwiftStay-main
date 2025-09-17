// src/hotels/search/api.ts
import axios from 'axios';

export async function searchHotels(query: string) {
  try {
    const url = `https://example.com/api/hotels?q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    return response.data;
  } catch (err: any) { // use `any` or `instanceof Error`
    if (err instanceof Error) {
      console.error('Hotel search error:', err.message);
    } else {
      console.error('Hotel search non-error:', err);
    }
    throw new Error('Failed to fetch hotels');
  }
}
