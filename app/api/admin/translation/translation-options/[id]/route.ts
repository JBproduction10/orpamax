import TranslationOption from '@/lib/database/models/TranslationOption';
import { connectToDatabase } from '@/lib/database/mongodb';
import { NextResponse } from 'next/server';


export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    await connectToDatabase();
    const data = await req.json();
    const updated = await TranslationOption.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    await connectToDatabase();
    await TranslationOption.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
