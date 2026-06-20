export async function GET() {
  return Response.json({
    google: 2,
    youtube: 1.5,
    news: 0.5,
    reddit: 1,
  })
}
