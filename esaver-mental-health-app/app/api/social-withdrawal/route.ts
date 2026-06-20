export async function GET() {
  const data = Array.from({ length: 7 }, (_, i) => ({
    calls: Math.floor(5 + Math.random() * 15),
    texts: Math.floor(10 + Math.random() * 30),
    frequency: Math.floor(50 + Math.random() * 50),
  }))

  return Response.json({ data })
}
