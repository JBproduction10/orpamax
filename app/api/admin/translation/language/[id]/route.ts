import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongodb';
import TranslationLanguage from '@/lib/database/models/TranslationLanguage';

export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const language = await TranslationLanguage.findById(id);
  return NextResponse.json(language);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const body = await req.json();
  const updated = await TranslationLanguage.findByIdAndUpdate(id, { name: body.name }, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  await TranslationLanguage.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}