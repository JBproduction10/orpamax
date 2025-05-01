// app/api/business-info/[id]/route.ts
import { NextResponse } from 'next/server';
import BusinessInfo from '@/lib/database/models/contact/BusinessInfo';
import {connectToDatabase} from '@/lib/database/mongodb';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await req.json();
  const updated = await BusinessInfo.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await BusinessInfo.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
