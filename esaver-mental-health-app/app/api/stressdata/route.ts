export async function GET() {
  return Response.json({
    stressScore: 0.65,
    predicted: [0.6, 0.7, 0.8, 0.73, 0.68, 0.72, 0.75, 0.65],
    actual: [0.5, 0.6, 0.75, 0.7, 0.65, 0.68, 0.72, 0.63],
  })
}
