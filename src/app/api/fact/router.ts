import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.factuality.wtf/api/fact');
    if (!res.ok) throw new Error('Failed to fetch fact');

    const data = await res.json();
    return NextResponse.json({ fact: data.fact });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { fact: 'Oops! Could not fetch a fact.' },
      { status: 500 }
    );
  }
}
