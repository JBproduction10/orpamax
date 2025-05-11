import { connectToDatabase } from "@/lib/database/mongodb";
import TranslationFaq from "@/lib/database/models/TranslationFaq";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    const faqs = await TranslationFaq.find().sort({category: 1});
    return NextResponse.json(faqs);
}