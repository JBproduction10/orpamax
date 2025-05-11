import { connectToDatabase } from "@/lib/database/mongodb";
import TranslationFaq from "@/lib/database/models/TranslationFaq";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    const faqs = await TranslationFaq.find().sort({category: 1});
    return NextResponse.json(faqs);
}

export async function POST(req: Request){
    await connectToDatabase();
    const data = await req.json();
    const faq = await TranslationFaq.create(data);
    return NextResponse.json(faq);
}