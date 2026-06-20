export async function GET() {
  const data = Array.from({ length: 10 }, (_, i) => ({
    vocabularyRichness: 60 + Math.random() * 40,
    sentenceVariation: 50 + Math.random() * 50,
    complexity: 40 + Math.random() * 60,
  }))

  return Response.json({ data })
}
