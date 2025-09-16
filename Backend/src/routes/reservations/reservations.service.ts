async createReservation(data: {
  userId: number;
  hotelId: number;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}) {
  // Check for overlapping bookings
  const overlapping = await this.prisma.reservation.findFirst({
    where: {
      hotelId: data.hotelId,
      roomType: data.roomType,
      status: 'confirmed',
      OR: [
        {
          checkIn: { lte: data.checkOut },
          checkOut: { gte: data.checkIn },
        },
      ],
    },
  });

  if (overlapping) {
    throw new Error('Selected room is not available for these dates');
  }

  // Create reservation
  return this.prisma.reservation.create({ data });
    }
