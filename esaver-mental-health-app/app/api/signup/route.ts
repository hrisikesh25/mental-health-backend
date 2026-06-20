export async function POST(request: Request) {
  const { fullName, email, password } = await request.json()

  if (!fullName || !email || !password) {
    return Response.json({ message: "Missing fields" }, { status: 400 })
  }

  return Response.json({
    success: true,
    user: {
      id: "1",
      email,
      fullName,
    },
  })
}
