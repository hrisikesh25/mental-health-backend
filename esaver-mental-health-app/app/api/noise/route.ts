export async function GET() {
  return Response.json({
    decibels: [45, 48, 50, 47, 46, 44, 43, 65],
    aqi: [72, 75, 8, 78, 74, 70, 68, 73], // Example AQI values
  })
}
