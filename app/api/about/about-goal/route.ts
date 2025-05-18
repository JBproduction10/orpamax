import { connectToDatabase } from '@/lib/database/mongodb';
import { AboutGoal } from '@/lib/database/models/AboutGoal';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const goals = await AboutGoal.find().sort({ createdAt: -1 });
  return NextResponse.json(goals);
}