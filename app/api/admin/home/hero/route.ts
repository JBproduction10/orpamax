import { connectToDatabase } from "@/lib/database/mongodb"; 
import HomeHero from "@/lib/database/models/HomeHero";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const heroes = await HomeHero.find().sort({ createdAt: -1 });
  return NextResponse.json(heroes);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const hero = await HomeHero.create(body);
  return NextResponse.json(hero);
}