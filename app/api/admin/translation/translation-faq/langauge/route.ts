import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongodb';
import TranslationLanguage from '@/lib/database/models/TranslationLanguage';

export async function GET() {
  await connectToDatabase();
  const languages = await TranslationLanguage.find().sort({ name: 1 });
  return NextResponse.json(languages);
}