import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import ContactHero from "@/lib/database/models/ContactHero";

export async function GET() {
    await connectToDatabase();
    const faqs = await ContactHero.find().sort({createdAt: 1 });
    return NextResponse.json(faqs);
}