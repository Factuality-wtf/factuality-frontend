import { NextResponse } from 'next/server';
import { ApiError, httpClient } from '@/lib/api/httpClient';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    await httpClient.post('/analytics/event', body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
