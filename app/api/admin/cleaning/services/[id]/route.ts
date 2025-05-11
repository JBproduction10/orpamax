import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";

const CleaningService  = CleaningModels.CleaningService;


export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const services = await CleaningService.findById(id);
  return NextResponse.json(services);
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  const body = await req.json();
  const updated = await CleaningService.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
  const {id} = await params;
  await connectToDatabase();
  await CleaningService.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted successfully' });
}