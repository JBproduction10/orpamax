import { connectToDatabase } from '@/lib/database/mongodb';
import BusinessInfo from '@/lib/database/models/BusinessInfo';
import { NextResponse } from 'next/server';


export async function GET() {
  await connectToDatabase();
  const data = await BusinessInfo.find().sort({ createdAt: 1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newEntry = await BusinessInfo.create(body);
  return NextResponse.json(newEntry);
}