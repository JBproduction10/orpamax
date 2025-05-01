// app/api/business-info/route.ts
import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib/database/mongodb';
import BusinessInfo from '@/lib/database/models/contact/BusinessInfo';

export async function GET() {
  await connectToDatabase();
  const data = await BusinessInfo.find();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newEntry = await BusinessInfo.create(body);
  return NextResponse.json(newEntry, { status: 201 });
}
