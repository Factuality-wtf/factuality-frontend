import { NextResponse } from "next/server"
import { FactClient, UpstreamError } from "@/lib/factClient"

const client = new FactClient()

export async function GET() {
  try {
    const fact = await client.getFact()
    return NextResponse.json({ data: fact })
  } catch (error) {
    if (error instanceof UpstreamError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      )
    }

    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503 }
    )
  }
}
