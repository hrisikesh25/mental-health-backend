export async function GET() {
  return Response.json({
    calm: 0.6,
    happy: 0.2,
    angry: 0.1,
    sad: 0.1,
  })
}
