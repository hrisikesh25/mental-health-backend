export async function GET() {
  const data = Array.from({ length: 24 }, (_, i) => ({
    temperature: 36.5 + Math.random() * 1,
    spo2: 95 + Math.random() * 5,
    steps: Math.floor(1000 + Math.random() * 2000),
    breathingRate: 12 + Math.random() * 8,
  }))

  return Response.json({ data })
}
