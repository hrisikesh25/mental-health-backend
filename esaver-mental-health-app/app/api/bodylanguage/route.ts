export async function GET() {
  return Response.json({
    balanceScore: [0.7, 0.75, 0.8, 0.72, 0.78, 0.81, 0.76, 0.79],
    activityLevel: [0.5, 0.6, 0.55, 0.65, 0.58, 0.62, 0.6, 0.63],
  })
}
