// src/app/api/fact/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const start = Date.now();

  try {
    const res = await fetch('https://api.factuality.wtf/api/fact', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const elapsed = Date.now() - start;
    console.log(`[FACT API] Response time: ${elapsed}ms`);

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
