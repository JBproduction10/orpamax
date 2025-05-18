import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import ContactFaq from "@/lib/database/models/ContactFaq";

export async function GET() {
    await connectToDatabase();
    const faqs = await ContactFaq.find().sort({createdAt: 1 });
    return NextResponse.json(faqs);
}