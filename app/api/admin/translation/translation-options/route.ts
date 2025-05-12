// app/api/options/route.ts
import TranslationOption from '@/lib/database/models/TranslationOption';
import { connectToDatabase } from '@/lib/database/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const options = await TranslationOption.find();
  return NextResponse.json(options);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const created = await TranslationOption.create(data);
  return NextResponse.json(created);
}
