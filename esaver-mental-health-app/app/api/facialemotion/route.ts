export async function GET() {
  return Response.json({
    joy: 0.5,
    neutral: 0.3,
    fear: 0.05,
    disgust: 0.05,
    surprise: 0.1,
  })
}
