export async function GET() {
  const data = [
    { name: "Positive", value: 60 + Math.random() * 20 },
    { name: "Neutral", value: 20 + Math.random() * 15 },
    { name: "Negative", value: 10 + Math.random() * 15 },
  ]

  return Response.json({ data })
}
