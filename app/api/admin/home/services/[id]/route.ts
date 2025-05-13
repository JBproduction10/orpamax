import { connectToDatabase } from '@/lib/database/mongodb';
import { HomeOverviewService } from '@/lib/database/models/HomeOverviewService';
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';


// Corrected GET method
export async function GET(req: Request, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  await connectToDatabase();
  const service = await HomeOverviewService.findById(id);
  if (!service) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  await connectToDatabase();
  const data = await req.json();
  const updated = await HomeOverviewService.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  await connectToDatabase();
  const service = await HomeOverviewService.findById(id);
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await cloudinary.uploader.destroy(service.imagePublicId);
  await HomeOverviewService.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}