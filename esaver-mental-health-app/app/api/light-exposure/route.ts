export async function GET() {
  const data = Array.from({ length: 24 }, (_, i) => ({
    lightLevel: i < 6 || i > 20 ? 10 + Math.random() * 20 : 300 + Math.random() * 200,
    circadianScore: 30 + Math.random() * 70,
  }))

  return Response.json({ data })
}
