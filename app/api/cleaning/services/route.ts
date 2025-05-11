import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";
import { NextResponse } from "next/server";

const CleaningService = CleaningModels.CleaningService;

export async function GET() {
  await connectToDatabase();
  const services = await CleaningService.find().sort({ createdAt: -1 });
  return NextResponse.json({ services });
}