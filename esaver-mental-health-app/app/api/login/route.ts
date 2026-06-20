export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return Response.json({ message: "Missing credentials" }, { status: 400 })
  }

  return Response.json({
    success: true,
    user: {
      id: "1",
      email,
      fullName: "John Doe",
    },
  })
}
