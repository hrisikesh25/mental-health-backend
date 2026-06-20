export async function GET() {
  const data = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return Response.json({ data })
}
