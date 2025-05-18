// app/api/theme/route.ts
import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib/database/mongodb';
import Theme from '@/lib/database/models/Theme';

export async function GET() {
  await connectToDatabase();
  const theme = await Theme.findOne().sort({ createdAt: -1 });;
  return NextResponse.json({ theme });
}