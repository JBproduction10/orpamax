import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib//database/mongodb';
import SocialMedia from '@/lib//database/models/SocialMedia';

export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase();
    const data = await SocialMedia.findById(id);
    return NextResponse.json(data);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase();
    const body = await req.json();
    const updated = await SocialMedia.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase();
    await SocialMedia.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
