import { connectToDatabase } from "@/lib/database/mongodb";
import HomeHero from "@/lib/database/models/HomeHero";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

// Corrected GET method
export async function GET(req: Request, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  await connectToDatabase();
  const hero = await HomeHero.findById(id);
  if (!hero) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(hero);
}

// PUT method to update a HomeHero
export async function PUT(req: Request, {params}: {params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const hero = await HomeHero.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(hero);
}

// DELETE method to delete a HomeHero and its image
export async function DELETE(req: Request, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;

 await connectToDatabase();
  await HomeHero.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
