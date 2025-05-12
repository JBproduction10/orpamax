import { connectToDatabase } from '@/lib/database/mongodb';
import ContactInfo from '@/lib/database/models/ContactInfo';
import { NextResponse } from 'next/server';

export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const data = await ContactInfo.findById(id);
  return NextResponse.json(data);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase();
    const body = await req.json();
    const updated = await ContactInfo.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase();
    await ContactInfo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' });
}