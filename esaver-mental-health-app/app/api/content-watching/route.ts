export async function GET() {
  const data = [
    { contentType: "Music", duration: 45 + Math.random() * 30, engagement: 75 + Math.random() * 20 },
    { contentType: "Video", duration: 60 + Math.random() * 40, engagement: 80 + Math.random() * 15 },
    { contentType: "Podcast", duration: 30 + Math.random() * 20, engagement: 70 + Math.random() * 25 },
  ]

  return Response.json({ data })
}
