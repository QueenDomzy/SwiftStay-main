// frontend/src/services/api.ts
export const getBookings = async () => {
  const res = await fetch("http://localhost:5000/api/bookings");
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

export const getDashboard = async () => {
  const res = await fetch("http://localhost:5000/api/dashboard");
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
};

export const createReservation = async (data: { userId: string; hotelId: string; date: string }) => {
  const res = await fetch("http://localhost:5000/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create reservation");
  return res.json();
};
