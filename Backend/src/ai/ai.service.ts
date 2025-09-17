// add this method if not already present
async getHotelRecommendations(preferences: string | object) {
  // If preferences is string, pass to generateText; if object, stringify
  const prompt = typeof preferences === 'string' ? preferences : JSON.stringify(preferences);
  // placeholder/simple mock - replace with OpenAI call later
  const hotels = [
    { name: 'SwiftStay Downtown', score: 4.7 },
    { name: 'SwiftStay Riverside', score: 4.5 },
  ];
  return hotels;
}
