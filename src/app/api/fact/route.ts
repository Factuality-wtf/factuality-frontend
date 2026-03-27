import { NextResponse } from 'next/server';
import { ApiError } from '@/lib/api/httpClient';
import { FactClient } from '@/lib/facts/factClient';

const client = new FactClient();

export async function GET() {
  try {
    console.log('GET FACT ');
    const fact = await client.getFact();
    return NextResponse.json({ data: fact });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
