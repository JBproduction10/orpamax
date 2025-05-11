import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongodb';
import TranslationHero from '@/lib/database/models/translationHero';

export async function GET() {
  await connectToDatabase();
  const heroes = await TranslationHero.find().sort({ createdAt: -1 });
  return NextResponse.json(heroes);
}