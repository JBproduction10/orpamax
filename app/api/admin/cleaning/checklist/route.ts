import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";
import { NextResponse } from "next/server";

const ChecklistSection = CleaningModels.CleaningChecklist;

export async function GET() {
  await connectToDatabase()
  const data = await ChecklistSection.find().sort({ createdAt: -1 })
  return Response.json(data)
}

export async function POST(req: Request) {
  await connectToDatabase()
  const body = await req.json()

  const newCheklits = await ChecklistSection.create({
    title: body.title,
    items: body.items,
  });

  return NextResponse.json({item: newCheklits});
}
