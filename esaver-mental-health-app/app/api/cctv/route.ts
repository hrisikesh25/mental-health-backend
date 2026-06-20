export async function GET() {
  return Response.json({
    bodyTension: 0.6,
    trend: [0.5, 0.55, 0.6, 0.58, 0.62, 0.65, 0.6, 0.58],
  })
}
