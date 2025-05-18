import { connectToDatabase } from '@/lib/database/mongodb';
import { AboutGoal } from '@/lib/database/models/AboutGoal';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string } >}) {
  await connectToDatabase();
  const {id} = await params;
  const goal = await AboutGoal.findById(id);
  return NextResponse.json(goal);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string } >}) {
  await connectToDatabase();
  const {id} = await params;
  const data = await req.json();
  const updated = await AboutGoal.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string } >}) {
  await connectToDatabase();
  const {id} = await params;
  const existing = await AboutGoal.findById(id);
  if (existing?.imagePublicId) {
    await cloudinary.uploader.destroy(existing.imagePublicId);
  }
  await AboutGoal.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
