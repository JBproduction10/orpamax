import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";

const CleaningService  = CleaningModels.CleaningService;


export async function GET(req: Request, { params }: any) {
  await connectToDatabase();
  const services = await CleaningService.findById(params.id);
  return NextResponse.json(services);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  const updated = await CleaningService.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await CleaningService.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted successfully' });
}