import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { address } = await req.json();

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json({ error: 'Failed to fetch coordinates', details: data }, { status: 400 });
    }

    const location = data.results[0].geometry.location;
    return NextResponse.json({ lat: location.lat, lng: location.lng });
  } catch (err) {
    console.error('Google Geocode error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
