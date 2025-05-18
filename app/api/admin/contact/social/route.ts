import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib//database/mongodb';
import SocialMedia from '@/lib//database/models/SocialMedia';

export async function GET() {
  await connectToDatabase();
  const data = await SocialMedia.find().sort({createdAt: -1});
  return NextResponse.json(data);
}

export async function POST(req:Request) {
  await connectToDatabase();
  const body = await req.json();
  const created = await SocialMedia.create(body);
  return NextResponse.json(created);
}
