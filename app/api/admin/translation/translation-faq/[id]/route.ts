import { connectToDatabase } from "@/lib/database/mongodb";
import TranslationFaq from "@/lib/database/models/TranslationFaq";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const data = await TranslationFaq.findById(id);
  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}){
  const {id} = await params;
  await connectToDatabase();
  const data = await req.json();
  const updated = await TranslationFaq.findByIdAndUpdate(id, data, {new: true})
  return NextResponse.json(updated)
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}){
  const {id} = await params;
  await connectToDatabase();
  await TranslationFaq.findByIdAndDelete(id);
  return NextResponse.json({success: true})
}