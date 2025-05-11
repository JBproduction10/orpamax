import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";

const CleaningHero = CleaningModels.CleaningHero;

export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const hero = await CleaningHero.findById(id);
  if (!hero) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(hero);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const body = await req.json();
  const hero = await CleaningHero.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(hero);
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  await CleaningHero.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted successfully' });
}