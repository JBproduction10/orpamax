import { connectToDatabase } from '@/lib/database/mongodb';
import BusinessInfo from '@/lib/database/models/BusinessInfo';
import { NextResponse } from 'next/server';

export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const data = await BusinessInfo.findById(id);
  return NextResponse.json(data);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase();
    const body = await req.json();
    const updated = await BusinessInfo.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase();
    await BusinessInfo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' });
}