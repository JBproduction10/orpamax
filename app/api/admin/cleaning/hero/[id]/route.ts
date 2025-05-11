import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";

const CleaningHero = CleaningModels.CleaningHero;

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const hero = await CleaningHero.findById(params.id);
  if (!hero) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(hero);
}

export async function PUT(req: NextRequest, { params }: any) {
  await connectToDatabase();
  const body = await req.json();
  const hero = await CleaningHero.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(hero);
}

export async function DELETE(_: NextRequest, { params }: any) {
  await connectToDatabase();
  await CleaningHero.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted successfully' });
}