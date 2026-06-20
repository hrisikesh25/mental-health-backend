export async function GET() {
  return Response.json({
    city: "Kolkata",
    coords: {
      lat: 22.5726,
      lng: 88.3639,
    },
    movement: [0.5, 0.8, 1.2, 0.9, 0.7, 1.1, 0.6, 0.8],
  })
}
