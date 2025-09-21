// src/app/api/fact/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.factually.wtf/api/fact', {
      signal: AbortSignal.timeout(1000), // 1 second timeout
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });


    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    if (!data?.fact) {
      throw new Error('Invalid data format');
    }

    return NextResponse.json({ fact: data.fact });
  } catch (err) {
    console.error('Fetch failed:', err);
    return NextResponse.json({ error: 'Error fetching fact.' }, { status: 500 });
  }
}
