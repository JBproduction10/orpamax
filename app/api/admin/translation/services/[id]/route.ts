import { connectToDatabase } from '@/lib/database/mongodb';
import TranslationService from '@/lib/database/models/TranslationService';
import { NextResponse } from 'next/server';

export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const services = await TranslationService.findById(id);
  return NextResponse.json(services);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const body = await req.json();
  const updated = await TranslationService.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  await TranslationService.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
