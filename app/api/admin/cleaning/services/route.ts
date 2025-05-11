import CleaningModels from "@/lib/database/models/CleaningModels";
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongodb';
const CleaningService = CleaningModels.CleaningService;

export async function GET() {
  await connectToDatabase();
  const services = await CleaningService.find().sort({ createdAt: -1 });
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
    const body = await req.json();
    const created = await CleaningService.create(body);
    return NextResponse.json(created);
}