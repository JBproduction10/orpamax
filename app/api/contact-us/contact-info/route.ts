import { connectToDatabase } from '@/lib/database/mongodb';
import ContactInfo from '@/lib/database/models/ContactInfo';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const data = await ContactInfo.find().sort({ createdAt: 1 });
  return NextResponse.json(data);
}