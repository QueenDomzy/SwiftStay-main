import { useEffect, useState } from "react";
import { getBookings, getDashboard } from "../services/api";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [dashboard, setDashboard] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const bookingsData = await getBookings();
        setBookings(bookingsData.bookings);

        const dashboardData = await getDashboard();
        setDashboard(dashboardData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Active Rooms: {dashboard.activeRooms}</p>
      <p>Total Revenue: ${dashboard.totalRevenue}</p>

      <h2>Bookings</h2>
      <ul>
        {bookings.map((b: any) => (
          <li key={b.id}>
            {b.user.name} booked {b.room.name} from {new Date(b.startDate).toLocaleDateString()} to {new Date(b.endDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

