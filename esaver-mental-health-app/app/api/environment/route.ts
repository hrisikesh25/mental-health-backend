export async function GET() {
  return Response.json({
    temperature: [22, 23, 24, 23, 22, 21, 20, 22],
    humidity: [45, 48, 50, 49, 47, 46, 44, 45],
    pressure: [1013, 1012, 1011, 1012, 1013, 1014, 1013, 1012],
  })
}
