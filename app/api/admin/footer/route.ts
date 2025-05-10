import { connectToDatabase } from "@/lib/database/mongodb";
import Footer from "@/lib/database/models/Footer";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  let footer = await Footer.findOne();

  if (!footer) {
    footer = new Footer();
    await footer.save();
  }

  return NextResponse.json(footer);
}