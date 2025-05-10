import { connectToDatabase } from "@/lib/database/mongodb";
import Footer from "@/lib/database/models/Footer";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    await connectToDatabase();
    const footers = await Footer.find(); // returns an array
    return NextResponse.json(footers);
  } catch (error) {
    console.error("Failed to fetch footers", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  await connectToDatabase();

  const existingFooter = await Footer.findOne();
  if (existingFooter) {
    return new NextResponse("Footer already exists", { status: 400 });
  }

  const newFooter = new Footer(data);
  await newFooter.save();

  return NextResponse.json({ message: "Footer created successfully" });
}
