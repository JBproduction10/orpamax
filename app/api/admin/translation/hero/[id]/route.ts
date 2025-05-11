import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongodb';
import TranslationHero from '@/lib/database/models/translationHero';

export async function GET(req:Request, { params }: {params:Promise<{id: string}> }) {
  const {id} = await params;
  await connectToDatabase();
  const hero = await TranslationHero.findById(id);
  if (!hero) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(hero);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  
  await connectToDatabase();
  const body = await req.json();
  const hero = await TranslationHero.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(hero);
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  await TranslationHero.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted successfully' });
}