import { connectToDatabase } from '@/lib/database/mongodb';
import TranslationService from '@/lib/database/models/TranslationService';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
  await connectToDatabase();
  const services = await TranslationService.findById(params.id);
  return NextResponse.json(services);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  const updated = await TranslationService.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await TranslationService.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
