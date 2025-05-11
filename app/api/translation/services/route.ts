import { connectToDatabase } from '@/lib/database/mongodb';
import TranslationService from '@/lib/database/models/TranslationService';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const services = await TranslationService.find().sort({ createdAt: -1 });
  return NextResponse.json(services);
}