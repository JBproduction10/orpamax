import { connectToDatabase } from '@/lib/database/mongodb';
import { HomeOverviewService } from '@/lib/database/models/HomeOverviewService';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const services = await HomeOverviewService.find();
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newService = await HomeOverviewService.create(body);
  return NextResponse.json(newService);
}
