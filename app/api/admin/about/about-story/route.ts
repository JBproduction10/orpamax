import { connectToDatabase } from '@/lib/database/mongodb';
import AboutStory  from '@/lib/database/models/AboutStory';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const story = await AboutStory.findOne().sort({createdAt: -1});
  return NextResponse.json(story);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const created = await AboutStory.create(data);
  return NextResponse.json(created);
}
