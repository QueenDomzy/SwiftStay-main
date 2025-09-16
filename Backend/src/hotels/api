@Get()
async getHotels(@Query('location') location: string) {
  return this.prisma.hotel.findMany({
    where: { location: { contains: location }, status: 'approved' },
  });
}
