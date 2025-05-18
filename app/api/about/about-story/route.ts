import { connectToDatabase } from '@/lib/database/mongodb';
import AboutStory  from '@/lib/database/models/AboutStory';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const goals = await AboutStory.find().sort({ createdAt: -1 });
  return NextResponse.json(goals);
}