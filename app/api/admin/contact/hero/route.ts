import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongodb';
import ContactHero from '@/lib/database/models/ContactHero';

export async function GET() {
  await connectToDatabase();
  const heroes = await ContactHero.find().sort({ createdAt: -1 });
  return NextResponse.json(heroes);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const hero = await ContactHero.create(body);
  return NextResponse.json(hero);
}