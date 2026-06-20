export async function GET() {
  return Response.json({
    heartRate: [80, 85, 79, 82, 78, 81, 83, 80],
    sleep: [6, 7, 8, 6.5, 7.5, 8, 7, 6.8],
    hrv: [65, 70, 68, 72, 66, 71, 69, 70],
  })
}
