import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongodb';
import TranslationLanguage from '@/lib/database/models/TranslationLanguage';

export async function GET(req: Request, { params }: any) {
  await connectToDatabase();
  const language = await TranslationLanguage.findById(params.id);
  return NextResponse.json(language);
}

export async function PUT(req: Request, { params }: any) {
  await connectToDatabase();
  const body = await req.json();
  const updated = await TranslationLanguage.findByIdAndUpdate(params.id, { name: body.name }, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await connectToDatabase();
  await TranslationLanguage.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}