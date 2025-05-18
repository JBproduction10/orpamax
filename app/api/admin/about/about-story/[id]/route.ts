import { connectToDatabase } from '@/lib/database/mongodb';
import AboutStory  from '@/lib/database/models/AboutStory';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string } >}) {
  await connectToDatabase();
  const {id} = await params;
  const goal = await AboutStory.findById(id);
  return NextResponse.json(goal);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string } >}) {
    const {id} = await params;
    await connectToDatabase();
    const data = await req.json();
    const updated = await AboutStory.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string } >}) {
    const {id} = await params;
    await connectToDatabase();
    const deleted = await AboutStory.findByIdAndDelete(id);
    return NextResponse.json(deleted);
}
