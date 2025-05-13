import { connectToDatabase } from "@/lib/database/mongodb"; 
import { HomeOverviewService } from "@/lib/database/models/HomeOverviewService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const data = await HomeOverviewService.find().sort({ createdAt: 1 });
  return NextResponse.json(data);
}