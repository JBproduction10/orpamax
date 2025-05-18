// app/api/theme/route.ts
import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib/database/mongodb';
import Theme from '@/lib/database/models/Theme';

export async function GET() {
  await connectToDatabase();
  const theme = await Theme.findOne();
  return NextResponse.json({ theme });
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  await Theme.deleteMany(); // only allow one theme config
  const theme = await Theme.create(body);
  return NextResponse.json({ theme });
}
