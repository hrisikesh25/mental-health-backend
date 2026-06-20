export async function GET() {
  return Response.json({
    twitter: 2.5,
    facebook: 1.5,
    instagram: 2.0,
    linkedin: 0.5,
  })
}
